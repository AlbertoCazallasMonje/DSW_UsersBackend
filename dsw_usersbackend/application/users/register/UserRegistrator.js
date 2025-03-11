const IUserRepository = require('../../../domain/users/IUserRepository');
const UserDomain = require('../../../domain/users/User.domain');

class UserRegistrator {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async Execute({dni, name, lastName, age, email, password, address, country}) {
        const user = UserDomain.Create({dni, name, lastName, age, email, password, address, country});
        await this._userRepository.Create(user);
    }
}

module.exports = UserRegistrator;