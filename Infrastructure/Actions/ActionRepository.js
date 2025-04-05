const sql = require('mssql');
const IActionRepository = require('../../Domain/Actions/IActionRepository');
const sqlConfig = require('../../App/Config/SqlServerConfig');

class ActionRepository extends IActionRepository {
    async findActionByCode(code) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            const result = await pool.request()
                .input('code', sql.NVarChar(50), code)
                .query(`
                    SELECT TOP 1 *
                    FROM actions
                    WHERE code = @code
                `);
            await pool.close();
            return result.recordset.length > 0 ? result.recordset[0] : null;
        } catch (err) {
            console.error('SQL error in findActionByCode', err);
            throw err;
        }
    }

    async findActionById(actionId) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            const result = await pool.request()
                .input('actionId', sql.UniqueIdentifier, actionId)
                .query(`
                    SELECT TOP 1 *
                    FROM actions
                    WHERE id = @actionId
                `);
            await pool.close();
            return result.recordset.length > 0 ? result.recordset[0] : null;
        } catch (err) {
            console.error('SQL error in findActionById', err);
            throw err;
        }
    }

    async createActionToken(actionToken) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('id', sql.UniqueIdentifier, actionToken.id)
                .input('refresh_token_id', sql.UniqueIdentifier, actionToken.refreshTokenId)
                .input('action_id', sql.UniqueIdentifier, actionToken.actionId)
                .input('token', sql.NVarChar(100), actionToken.token)
                .query(`
                    INSERT INTO action_tokens (id, refresh_token_id, action_id, token)
                    VALUES (@id, @refresh_token_id, @action_id, @token)
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in createActionToken', err);
            throw err;
        }
    }

    async findActionTokenByToken(token) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            const result = await pool.request()
                .input('token', sql.NVarChar(100), token)
                .query(`
                    SELECT TOP 1 *
                    FROM action_tokens
                    WHERE token = @token
                `);
            await pool.close();
            return result.recordset.length > 0 ? result.recordset[0] : null;
        } catch (err) {
            console.error('SQL error in findActionTokenByToken', err);
            throw err;
        }
    }

    async markActionTokenUsed(id) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('id', sql.UniqueIdentifier, id)
                .query(`
                    UPDATE action_tokens
                    SET used = 1
                    WHERE id = @id
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in markActionTokenUsed', err);
            throw err;
        }
    }

    async createPasswordResetToken(passwordResetToken) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('id', sql.UniqueIdentifier, passwordResetToken.id)
                .input('action_id', sql.UniqueIdentifier, passwordResetToken.actionId)
                .input('password_token', sql.NVarChar(100), passwordResetToken.token)
                .input('email', sql.NVarChar(200), passwordResetToken.email)
                .input('expires_at', sql.DateTime2, passwordResetToken.expiresAt)
                .query(`
                    INSERT INTO password_resets (id, action_id, password_token, email, expires_at)
                    VALUES (@id, @action_id, @password_token, @email, @expires_at)
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in createPasswordResetToken', err);
            throw err;
        }
    }

    async validatePasswordResetToken(token) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            const result = await pool.request()
                .input('password_token', sql.NVarChar(100), token)
                .query(`
                SELECT TOP 1 *
                FROM password_resets
                WHERE password_token = @password_token
            `);

            if (result.recordset.length === 0) {
                throw new Error('Token de recuperación no encontrado.');
            }

            const resetToken = result.recordset[0];

            if (resetToken.used) {
                throw new Error('El token ya ha sido utilizado.');
            }

            const now = new Date();
            if (new Date(resetToken.expires_at) < now) {
                throw new Error('El token ha expirado.');
            }

            await pool.request()
                .input('id', sql.UniqueIdentifier, resetToken.id)
                .query(`
                UPDATE password_resets
                SET used = 1
                WHERE id = @id
            `);
            await pool.close();

            return resetToken;
        } catch (err) {
            console.error('SQL error in validatePasswordResetToken', err);
            throw err;
        }
    }

}

module.exports = ActionRepository;
