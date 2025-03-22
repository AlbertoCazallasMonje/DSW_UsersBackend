const SessionDomain = require('../../../Domain/Sessions/Session.domain');

class SessionTokenGenerator {
    constructor(sessionRepository) {
        this._sessionRepository = sessionRepository;
    }

    async Execute(u_dni, refreshExpiresAt) {
        const sessionExpiresAt = new Date(Date.now() + 60 * 60 * 1000);

        let session = await this._sessionRepository.findByUserDni(u_dni);

        if (!session) {
            session = SessionDomain.createNew({
                u_dni,
                refreshExpiresAt,
                sessionExpiresAt
            });

            const ephemeralToken = session.generateSessionToken();
            session.sessionToken = ephemeralToken;

            await this._sessionRepository.createRefreshToken(session);
        } else {
            session.expiresAt = refreshExpiresAt;
            session.sessionTokenExpiresAt = sessionExpiresAt;

            const ephemeralToken = session.generateSessionToken();
            session.sessionToken = ephemeralToken;

            await this._sessionRepository.updateSessionToken(session);
        }

        return {
            sessionToken: session.sessionToken
        };
    }
}

module.exports = SessionTokenGenerator;
