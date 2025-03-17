class ActionTokenValidator {
    constructor(actionRepository) {
        this._actionRepository = actionRepository;
    }

    async Execute(token, expectedActionCode) {
        const actionTokenRecord = await this._actionRepository.findActionTokenByToken(token);
        if (!actionTokenRecord) {
            throw new Error('Invalid action token.');
        }
        if (actionTokenRecord.used) {
            throw new Error('Action token has already been used.');
        }
        const action = await this._actionRepository.findActionById(actionTokenRecord.action_id);
        if (!action || action.code !== expectedActionCode) {
            throw new Error('Action token does not correspond to the expected action.');
        }
        await this._actionRepository.markActionTokenUsed(actionTokenRecord.id);
        return true;
    }
}

module.exports = ActionTokenValidator;
