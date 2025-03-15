const UserDomain = require('../../../Domain/Users/User.domain');

class UserRegister {
    constructor(UserRepository) {
        this._userRepository = UserRepository;
    }

    async Execute({dni, name, lastName, age, email, password, address, country}) {
        const user = UserDomain.Create({dni, name, lastName, age, email, password, address, country});
        await this._userRepository.Create(user);
    }
}

module.exports = UserRegister;