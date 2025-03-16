class IUserRepository {
    async Create(user) {
        throw new Error('Error while creating an user.');
    }

    async Update(user) {
        throw new Error('Error while updating an user.');
    }

    async GetByEmail(email) {
        throw new Error('Error while getting an user by email.');
    }

    async GetByDni(dni) {
        throw new Error('Error while getting an user by DNI.');
    }
}

module.exports = IUserRepository;