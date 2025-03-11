class IUserRepository {
    async Create(user) {
        throw new Error('Error while creating an user.');
    }

    async Log({email, password}) {
        throw new Error('Error while logging an user.');
    }

    async Update(user) {
        throw new Error('Error while updating an user.');
    }

    async GetByDni(dni) {
        throw new Error('Error while getting an user.');
    }
}

module.exports = IUserRepository;