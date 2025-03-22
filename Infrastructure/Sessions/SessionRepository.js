const sql = require('mssql');
const ISessionRepository = require('../../Domain/Sessions/ISessionRepository');
const SessionDomain = require('../../Domain/Sessions/Session.domain');
const sqlConfig = require('../../App/Config/SqlServerConfig');

class SessionRepository extends ISessionRepository {
    async findByUserDni(u_dni) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            const result = await pool.request()
                .input('u_dni', sql.NVarChar(9), u_dni)
                .query(`
                    SELECT TOP 1 *
                    FROM refresh_tokens
                    WHERE u_dni = @u_dni
                      AND used = 0
                    ORDER BY created_at DESC
                `);
            await pool.close();
            if (result.recordset.length > 0) {
                const row = result.recordset[0];
                return new SessionDomain({
                    id: row.id,
                    u_dni: row.u_dni,
                    token: row.token,
                    created_at: row.created_at,
                    expires_at: row.expires_at,
                    used: row.used
                });
            } else {
                return null;
            }
        } catch (err) {
            console.error('SQL error in findByUserDni', err);
            throw err;
        }
    }

    async createRefreshToken(session) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('id', sql.UniqueIdentifier, session.id)
                .input('u_dni', sql.NVarChar(9), session.u_dni)
                .input('token', sql.NVarChar(100), session.token)
                .input('session_token', sql.NVarChar(100), session.sessionToken)
                .input('session_token_expires_at', sql.DateTime, session.sessionTokenExpiresAt) // <-- NUEVO
                .input('expires_at', sql.DateTime2, session.expiresAt)
                .query(`
                    INSERT INTO refresh_tokens (
                        id, u_dni, token, session_token, session_token_expires_at, expires_at
                    )
                    VALUES (
                               @id, @u_dni, @token, @session_token, @session_token_expires_at, @expires_at
                           )
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in createRefreshToken', err);
            throw err;
        }
    }

    async updateSessionToken(session) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('id', sql.UniqueIdentifier, session.id)
                .input('session_token', sql.NVarChar(100), session.sessionToken)
                .input('session_token_expires_at', sql.DateTime, session.sessionTokenExpiresAt) // <-- NUEVO
                .input('expires_at', sql.DateTime2, session.expiresAt)
                .input('used', sql.Bit, session.used)
                .query(`
                    UPDATE refresh_tokens
                    SET session_token = @session_token,
                        session_token_expires_at = @session_token_expires_at,
                        expires_at = @expires_at,
                        used = @used
                    WHERE id = @id
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in updateSessionToken', err);
            throw err;
        }
    }

    async updateRefreshToken(session) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('id', sql.UniqueIdentifier, session.id)
                .input('used', sql.Bit, session.used)
                .query(`
                    UPDATE refresh_tokens
                    SET used = @used
                    WHERE id = @id
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in updateRefreshToken', err);
            throw err;
        }
    }

    async deleteSessionToken(session) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('id', sql.UniqueIdentifier, session.id)
                .query(`
                UPDATE refresh_tokens
                SET session_token = NULL
                WHERE id = @id
            `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in deleteSessionToken', err);
            throw err;
        }
    }

    async findByToken(token) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            const result = await pool.request()
                .input('token', sql.NVarChar(100), token)
                .query(`
                    SELECT TOP 1 *
                    FROM refresh_tokens
                    WHERE token = @token
                      AND used = 0
                    ORDER BY created_at DESC
                `);
            await pool.close();

            if (result.recordset.length > 0) {
                const row = result.recordset[0];
                return new SessionDomain({
                    id: row.id,
                    u_dni: row.u_dni,
                    token: row.token,
                    created_at: row.created_at,
                    expires_at: row.expires_at,
                    used: row.used
                });
            } else {
                return null;
            }
        } catch (err) {
            console.error('SQL error in findByToken', err);
            throw err;
        }
    }

    async findBySessionToken(sessionToken) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            const result = await pool.request()
                .input('session_token', sql.NVarChar(100), sessionToken)
                .query(`
                    SELECT TOP 1 *
                    FROM refresh_tokens
                    WHERE session_token = @session_token
                      AND used = 0
                    ORDER BY created_at DESC
                `);
            await pool.close();

            if (result.recordset.length > 0) {
                const row = result.recordset[0];
                return new SessionDomain({
                    id: row.id,
                    u_dni: row.u_dni,
                    token: row.token,
                    session_token: row.session_token,
                    session_token_expires_at: row.session_token_expires_at, // <-- NUEVO
                    created_at: row.created_at,
                    expires_at: row.expires_at,
                    used: row.used
                });
            } else {
                return null;
            }
        } catch (err) {
            console.error('SQL error in findBySessionToken', err);
            throw err;
        }
    }
}

module.exports = SessionRepository;
