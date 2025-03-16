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
}

module.exports = ISessionRepository;
