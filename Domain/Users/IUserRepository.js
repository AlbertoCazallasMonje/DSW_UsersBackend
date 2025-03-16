class IUserRepository {
    async Create(user) {
        throw new Error('Error while creating an user.');
    }

    async Log({email, password}) {
        throw new Error('Error while logging an user.');
    }

    async GetByEmail(email) {
        throw new Error('Error while getting an user by email.');
    }
}

module.exports = IUserRepository;