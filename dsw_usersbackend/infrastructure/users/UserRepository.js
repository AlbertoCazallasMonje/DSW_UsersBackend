const sql = require('mssql');
const IUserRepository = require('../../domain/users/IUserRepository');
const sqlConfig = require('../../app/config/SqlServerConfig');

class UserRepository extends IUserRepository{
    async Create(user) {
        try {
            const pool = await sql.connect(sqlConfig.config);
            await pool.request()
                .input('u_dni', sql.NVarChar(9), user.getDni())
                .input('u_name', sql.NVarChar(50), user.getName())
                .input('u_lastName', sql.NVarChar(100), user.getLastName())
                .input('u_age', sql.TinyInt, user.getAge())
                .input('u_email', sql.NVarChar(100), user.getEmail())
                .input('u_address', sql.NVarChar(100), user.getAddress())
                .input('u_country', sql.Char(2), user.getCountry())
                .query(`
                    INSERT INTO users (u_dni, u_name, u_lastName, u_age, u_email, u_address, u_country)
                    VALUES (@u_dni, @u_name, @u_lastName, @u_age, @u_email, @u_address, @u_country)
                `);
            await pool.close();
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    }
}
module.exports = UserRepository;