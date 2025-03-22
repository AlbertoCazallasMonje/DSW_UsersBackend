class ISessionRepository {
    async findByUserDni(u_dni) {
        throw new Error('Error finding by user DNI.');
    }

    async createRefreshToken(session) {
        throw new Error('Error creating refresh token.');
    }

    async updateRefreshToken(session) {
        throw new Error('Error updating refresh token.');
    }

    async findByToken(token) {
        throw new Error('Error finding by token.');
    }

    async deleteSessionToken(session) {
        throw new Error('Error deleting session token.');
    }
}

module.exports = ISessionRepository;
