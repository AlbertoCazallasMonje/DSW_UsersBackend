const sql = require('mssql');
const IUserRepository = require('../../Domain/Users/IUserRepository');
const sqlConfig = require('../../App/Config/SqlServerConfig');

class UserRepository extends IUserRepository {
    async Create(user) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('u_dni', sql.NVarChar(9), user.getDni())
                .input('u_name', sql.NVarChar(50), user.getName())
                .input('u_lastName', sql.NVarChar(100), user.getLastName())
                .input('u_age', sql.TinyInt, user.getAge())
                .input('u_email', sql.NVarChar(100), user.getEmail())
                .input('u_password', sql.NVarChar(100), user.getPassword())
                .input('u_address', sql.NVarChar(100), user.getAddress())
                .input('u_country', sql.Char(2), user.getCountry())
                .query(`
                    INSERT INTO users (u_dni, u_name, u_lastName, u_age, u_email, u_password, u_address, u_country)
                    VALUES (@u_dni, @u_name, @u_lastName, @u_age, @u_email, @u_password, @u_address, @u_country)
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    }

    async Update(user) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('u_dni', sql.NVarChar(9), user.getDni())
                .input('u_name', sql.NVarChar(50), user.getName())
                .input('u_lastName', sql.NVarChar(100), user.getLastName())
                .input('u_age', sql.TinyInt, user.getAge())
                .input('u_email', sql.NVarChar(100), user.getEmail())
                .input('u_password', sql.NVarChar(100), user.getPassword())
                .input('u_address', sql.NVarChar(100), user.getAddress())
                .input('u_country', sql.Char(2), user.getCountry())
                .query(`
                    UPDATE users
                    SET u_name     = @u_name,
                        u_lastName = @u_lastName,
                        u_age      = @u_age,
                        u_email    = @u_email,
                        u_password = @u_password,
                        u_address  = @u_address,
                        u_country  = @u_country
                    WHERE u_dni = @u_dni
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in Update', err);
            throw err;
        }
    }

    async GetByDni(dni) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            let result = await pool.request()
                .input('u_dni', sql.NVarChar(9), dni)
                .query(`
                    SELECT u_dni,
                           u_name,
                           u_lastName,
                           u_age,
                           u_email,
                           u_address,
                           u_country,
                           is_admin
                    FROM users
                    WHERE u_dni = @u_dni
                `);
            await pool.close();
            return result.recordset.length > 0 ? result.recordset[0] : null;
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    }

    async GetByEmail(email) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            let result = await pool.request()
                .input('u_email', sql.NVarChar(100), email)
                .query(`
                    SELECT u_dni, u_name, u_lastName, u_email, u_password, is_admin
                    FROM users
                    WHERE u_email = @u_email
                `);
            await pool.close();
            return result.recordset.length > 0 ? result.recordset[0] : null;
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    }

    async Delete(dni) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('u_dni', sql.NVarChar(9), dni)
                .query(`
                    DELETE
                    FROM users
                    WHERE u_dni = @u_dni
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in Delete', err);
            throw err;
        }
    }

    async GetAllUserData(dni) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            let result = await pool.request()
                .input('u_dni', sql.NVarChar(9), dni)
                .query(`
                    SELECT u_dni,
                           u_name,
                           u_lastName,
                           u_age,
                           u_email,
                           u_password,
                           u_address,
                           u_country,
                           is_admin
                    FROM users
                    WHERE u_dni = @u_dni
                `);
            await pool.close();
            return result.recordset.length > 0 ? result.recordset[0] : null;
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    }

    async UpdateUserPassword(dni, newHashedPassword) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('u_dni', sql.NVarChar(9), dni)
                .input('u_password', sql.NVarChar(100), newHashedPassword)
                .query(`
                    UPDATE users
                    SET u_password = @u_password
                    WHERE u_dni = @u_dni
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in updateUserPassword', err);
            throw err;
        }
    }

    async LoadUsers() {
        try {
            let pool = await sql.connect(sqlConfig.config);
            let result = await pool.request()
                .query(`
                    SELECT u_name, u_lastName, u_email, is_admin
                    FROM users
                `);
            await pool.close();
            return result.recordset;
        } catch (err) {
            console.error('SQL error in LoadUsers', err);
            throw err;
        }
    }

    async GetFrequentUsers(userDni, limit = 5) {
        try {
            const pool = await sql.connect(sqlConfig.config);
            const result = await pool.request()
                .input('user_dni', sql.NVarChar(9), userDni)
                .input('limit', sql.Int, limit)
                .query(`
                    SELECT TOP(@limit)
                        fu.frequent_dni       AS frequent_dni,
                            fu.interaction_count AS interaction_count,
                           u.u_name             AS u_name,
                           u.u_lastName         AS u_lastName,
                           u.u_email            AS u_email
                    FROM frequent_users fu
                             INNER JOIN users u
                                        ON u.u_dni = fu.frequent_dni
                    WHERE fu.u_dni = @user_dni
                    ORDER BY fu.interaction_count DESC;
                `);
            await pool.close();
            return result.recordset;
        } catch (err) {
            console.error('SQL error in GetFrequentUsers', err);
            throw err;
        }
    }

    async BlockUser(blockerDni, blockedDni) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('blocker_dni', sql.NVarChar(9), blockerDni)
                .input('blocked_dni', sql.NVarChar(9), blockedDni)
                .query(`
                    INSERT INTO blocked (blocker_dni, blocked_dni)
                    VALUES (@blocker_dni, @blocked_dni)
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error in BlockUser', err);
            if (err.number === 2627) {
                throw new Error('User is already blocked.');
            }
            throw err;
        }
    }

}

module.exports = UserRepository;