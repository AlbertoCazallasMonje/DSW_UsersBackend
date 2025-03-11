const IUserRepository = require('../../../domain/users/IUserRepository');

class UserLogger{
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async Execute({ email, password }) {
        try {
            const token = await this._userRepository.Log({ email, password });
            return token;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = UserLogger;