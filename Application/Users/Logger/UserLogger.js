const IUserRepository = require('../../../Domain/Users/IUserRepository');
const SessionRepository = require("../../../Infrastructure/Sessions/SessionRepository");
const SessionTokenGenerator = require("../../Sessions/SessionTokenGenerator/SessionTokenGenerator");

class UserLogger{
    constructor(UserRepository) {
        this._userRepository = UserRepository;
    }

    async Execute({ email, password }) {

        const userRecord = await this._userRepository.GetByEmail(email);
        if (!userRecord) {
            throw new Error('User not found.');
        }

        if (userRecord.u_password !== password) {
            throw new Error('Invalid credentials.');
        }

        const sessionRepository = new SessionRepository();
        const sessionTokenGenerator = new SessionTokenGenerator(sessionRepository);

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const sessionData = await sessionTokenGenerator.Execute(userRecord.u_dni, expiresAt);
        return {
            message: 'Login successful',
            sessionToken: sessionData.sessionToken,
            refreshToken: sessionData.refreshToken
        };
    }

}

module.exports = UserLogger;