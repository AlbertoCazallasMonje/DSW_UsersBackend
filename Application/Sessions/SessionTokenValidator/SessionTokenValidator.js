class SessionTokenValidator {
    constructor(sessionRepository) {
        this._sessionRepository = sessionRepository;
    }

    async Execute(u_dni, providedSessionToken) {
        const session = await this._sessionRepository.findByUserDni(u_dni);
        if (!session) {
            throw new Error('Session not found.');
        }

        const expectedSessionToken = session.generateSessionToken();
        if (providedSessionToken !== expectedSessionToken) {
            throw new Error('Invalid session token.');
        }

        if (new Date() > new Date(session.expiresAt)) {
            throw new Error('Session expired.');
        }
        return true;
    }
}

module.exports = SessionTokenValidator;
