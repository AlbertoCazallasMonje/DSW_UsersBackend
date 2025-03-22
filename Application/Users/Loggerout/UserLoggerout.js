const SessionTokenValidator = require('../../Sessions/SessionTokenValidator/SessionTokenValidator');

class UserLoggerout {
    constructor(sessionRepository) {
        this._sessionRepository = sessionRepository;
    }

    async Execute({ sessionToken }) {
        const sessionValidator = new SessionTokenValidator(this._sessionRepository);
        let session;

        try {
            session = await sessionValidator.Execute(sessionToken);
        } catch (error) {
            session = await this._sessionRepository.findBySessionToken(sessionToken);
        }

        if (session) {
            session.markUsed();

            await this._sessionRepository.deleteSessionToken(session);
        }

        return { message: 'Session closed successfully' };
    }
}

module.exports = UserLoggerout;
