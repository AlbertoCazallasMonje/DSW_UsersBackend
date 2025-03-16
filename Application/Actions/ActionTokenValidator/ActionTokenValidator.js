class ActionTokenValidator {
    constructor(actionRepository) {
        this._actionRepository = actionRepository;
    }

    async Execute(token) {
        const actionTokenRecord = await this._actionRepository.findActionTokenByToken(token);
        if (!actionTokenRecord) {
            throw new Error('Invalid action token.');
        }
        if (actionTokenRecord.used) {
            throw new Error('Action token has already been used.');
        }
        await this._actionRepository.markActionTokenUsed(actionTokenRecord.id);
        return true;
    }
}

module.exports = ActionTokenValidator;
