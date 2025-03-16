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
                    WHERE u_dni = @u_dni AND used = 0
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
                .input('token', sql.NVarChar(50), session.token)
                .input('expires_at', sql.DateTime2, session.expiresAt)
                .query(`
                    INSERT INTO refresh_tokens (id, u_dni, token, expires_at)
                    VALUES (@id, @u_dni, @token, @expires_at)
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in createRefreshToken', err);
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
}

module.exports = SessionRepository;
