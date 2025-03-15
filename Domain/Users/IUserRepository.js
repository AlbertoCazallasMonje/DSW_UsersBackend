class IUserRepository {
    async Create(user) {
        throw new Error('Error while creating an user.');
    }
}

module.exports = IUserRepository;