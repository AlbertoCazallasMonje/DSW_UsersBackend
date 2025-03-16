const ActionToken = require('../../../Domain/Actions/ActionToken.domain');

class ActionTokenGenerator {
    constructor(actionRepository) {
        this._actionRepository = actionRepository;
    }

    async Execute({ refreshTokenId, actionCode }) {
        const action = await this._actionRepository.findActionByCode(actionCode);
        if (!action) {
            throw new Error('Invalid action code.');
        }
        const actionToken = ActionToken.createNew({ refreshTokenId, actionId: action.id });
        await this._actionRepository.createActionToken(actionToken);
        return actionToken.token;
    }
}

module.exports = ActionTokenGenerator;
