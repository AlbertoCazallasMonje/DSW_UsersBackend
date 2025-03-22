class SessionTokenValidator {
    constructor(sessionRepository) {
        this._sessionRepository = sessionRepository;
    }

    async Execute(providedSessionToken) {
        const session = await this._sessionRepository.findBySessionToken(providedSessionToken);
        if (!session) {
            throw new Error('Session not found.');
        }

        if (session.sessionToken !== providedSessionToken) {
            throw new Error('Invalid session token.');
        }

        if (new Date() > new Date(session.sessionTokenExpiresAt)) {
            throw new Error('Session token expired.');
        }

        if (new Date() > new Date(session.expiresAt)) {
            throw new Error('Refresh token expired.');
        }

        if (session.used) {
            throw new Error('Session token already used.');
        }

        return session;
    }
}

module.exports = SessionTokenValidator;
