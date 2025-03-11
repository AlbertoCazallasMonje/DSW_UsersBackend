const jwt = require('jsonwebtoken');
const IUserRepository = require('../../../domain/users/IUserRepository');
const UserDomain = require('../../../domain/users/User.domain');

class UserUpdater {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async Execute({ token, dni, name, lastName, age, email, password, address, country }) {
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }

        if (decodedToken.dni !== dni) {
            throw new Error('Token does not belong to the user');
        }

        const now = new Date();
        const tokenLastLogin = new Date(decodedToken.lastLogin);
        if ((now - tokenLastLogin) > 3600000) {
            throw new Error('Token expired');
        }

        const user = UserDomain.Create({ dni, name, lastName, age, email, password, address, country });

        const currentUser = await this._userRepository.GetByDni(dni);

        if (
            currentUser.u_name === name &&
            currentUser.u_lastName === lastName &&
            currentUser.u_age === age &&
            currentUser.u_email === email &&
            currentUser.u_password === password &&
            currentUser.u_address === address &&
            currentUser.u_country === country
        ) {
            return { message: 'No changes in the user' };
        }

        await this._userRepository.Update(user);
        return { message: 'User data updated' };
    }
}
module.exports = UserUpdater;