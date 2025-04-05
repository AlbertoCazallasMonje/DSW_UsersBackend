const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const {createNew} = require("../../../Domain/Actions/PasswordResetToken.domain");


class PasswordTokenGenerator {
    constructor(actionRepository) {
        this._actionRepository = actionRepository;
    }

    async Execute({ email, actionCode }) {
        const action = await this._actionRepository.findActionByCode(actionCode);
        if (!action) {
            throw new Error('Invalid action code.');
        }

        const passwordResetToken = createNew({
            actionId: action.id,
            email
        });

        await this._actionRepository.createPasswordResetToken(passwordResetToken);

        return passwordResetToken.token;
    }
}
module.exports.PasswordTokenGenerator = PasswordTokenGenerator;