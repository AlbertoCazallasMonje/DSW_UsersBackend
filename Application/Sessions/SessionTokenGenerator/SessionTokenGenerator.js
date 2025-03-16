const SessionDomain = require('../../../Domain/Sessions/Session.domain');

class SessionTokenGenerator {
    constructor(sessionRepository) {
        this._sessionRepository = sessionRepository;
    }

    async Execute(u_dni, expiresAt) {
        let session = await this._sessionRepository.findByUserDni(u_dni);

        if (!session) {
            session = SessionDomain.createNew({ u_dni, expiresAt });
            await this._sessionRepository.createRefreshToken(session);
        }

        const sessionToken = session.generateSessionToken();
        return { refreshToken: session.token, sessionToken };
    }
}

module.exports = SessionTokenGenerator;
