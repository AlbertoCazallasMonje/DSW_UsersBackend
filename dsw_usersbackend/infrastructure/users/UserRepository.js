const sql = require('mssql');
const jwt = require('jsonwebtoken');
const IUserRepository = require('../../domain/users/IUserRepository');
const sqlConfig = require('../../app/config/SqlServerConfig');

class UserRepository extends IUserRepository {
    async Create(user) {
        try {
            const pool = await sql.connect(sqlConfig.config);
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
// TODO: Adaptar, que en caso de que inicie sesión un admin, se acualice la tabla de admins
    async Log({email, password}) {
        try {
            const pool = await sql.connect(sqlConfig.config);
            let result;

            result = await pool.request()
                .input('u_email', sql.NVarChar(100), email)
                .input('u_password', sql.NVarChar(100), password)
                .query(`SELECT u_dni
                        FROM users
                        WHERE u_email = @u_email
                          AND u_password = @u_password`);

            if (result.recordset.length === 0) {
                result = await pool.request()
                    .input('a_email', sql.NVarChar(100), email)
                    .input('a_password', sql.NVarChar(100), password)
                    .query(`SELECT a_dni
                            FROM admins
                            WHERE a_email = @a_email
                              AND a_password = @a_password`);
            }

            if (result.recordset.length === 0) {
                await pool.close();
                throw new Error('Credenciales incorrectas');
            }

            const dni = result.recordset[0].u_dni || result.recordset[0].a_dni;

            const lastLogin = new Date().toISOString();
            await pool.request()
                .input('dni', sql.NVarChar(9), dni)
                .input('lastLogin', sql.DateTime, lastLogin)
                .query(`UPDATE users
                        SET u_lastLogin = @lastLogin
                        WHERE u_dni = @dni`);

            const token = jwt.sign({ dni, lastLogin }, process.env.JWT_SECRET, { expiresIn: '1h' });


            await pool.close();
            return token;
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    }

    async Update(user) {
        try {
            const pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('u_dni', sql.NVarChar(9), user.getDni())
                .input('u_name', sql.NVarChar(50), user.getName())
                .input('u_lastName', sql.NVarChar(100), user.getLastName())
                .input('u_age', sql.TinyInt, user.getAge())
                .input('u_email', sql.NVarChar(100), user.getEmail())
                .input('u_password', sql.NVarChar(100), user.getPassword())
                .input('u_address', sql.NVarChar(100), user.getAddress())
                .input('u_country', sql.Char(2), user.getCountry())
                .input('u_lastLogin', sql.DateTime, new Date().toISOString())
                .query(`
                    UPDATE users
                    SET u_name     = @u_name,
                        u_lastName = @u_lastName,
                        u_age      = @u_age,
                        u_email    = @u_email,
                        u_password = @u_password,
                        u_address  = @u_address,
                        u_country  = @u_country,
                        u_lastLogin = @u_lastLogin
                    WHERE u_dni = @u_dni
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    }

    async GetByDni(dni) {
        try {
            const pool = await sql.connect(sqlConfig.config);
            const result = await pool.request()
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
                           u_lastLogin
                    FROM users
                    WHERE u_dni = @u_dni
                `);
            await pool.close();
            if (result.recordset.length === 0) {
                throw new Error('Usuario no encontrado.');
            }
            return result.recordset[0];
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    }
}

module.exports = UserRepository;


