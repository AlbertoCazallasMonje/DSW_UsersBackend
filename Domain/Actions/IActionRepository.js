class IActionRepository {
    async createActionToken(actionToken) {
        throw new Error('Error creating the Action Token.');
    }

    async findActionTokenByToken(token) {
        throw new Error('Error finding the Action.');
    }

    async markActionTokenUsed(id) {
        throw new Error('Error marking the token as used.');
    }

    async findActionByCode(code) {
        throw new Error('Error finding action by code.');
    }
}

module.exports = IActionRepository;
