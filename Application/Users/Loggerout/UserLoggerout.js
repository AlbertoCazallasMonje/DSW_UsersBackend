const SessionTokenValidator = require('../../Sessions/SessionTokenValidator/SessionTokenValidator');

class UserLoggerout {
    constructor(userRepository, sessionRepository) {
        this._userRepository = userRepository;
        this._sessionRepository = sessionRepository;
    }

    async Execute({ dni, sessionToken }) {

        const sessionValidator = new SessionTokenValidator(this._sessionRepository);
        await sessionValidator.Execute(dni, sessionToken);

        const session = await this._sessionRepository.findByUserDni(dni);
        if (!session) {
            throw new Error('Session not found.');
        }

        session.markUsed();
        await this._sessionRepository.updateRefreshToken(session);

        return { message: 'Session closed successfully' };
    }
}

module.exports = UserLoggerout;
