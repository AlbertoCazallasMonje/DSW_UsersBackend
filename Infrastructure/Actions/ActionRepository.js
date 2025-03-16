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

    async createActionToken(actionToken) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('id', sql.UniqueIdentifier, actionToken.id)
                .input('refresh_token_id', sql.UniqueIdentifier, actionToken.refreshTokenId)
                .input('action_id', sql.UniqueIdentifier, actionToken.actionId)
                .input('token', sql.NVarChar(50), actionToken.token)
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
                .input('token', sql.NVarChar(50), token)
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
}

module.exports = ActionRepository;
