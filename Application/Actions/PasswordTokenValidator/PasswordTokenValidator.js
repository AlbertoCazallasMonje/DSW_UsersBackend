class PasswordTokenValidator {
    constructor(actionRepository) {
        this._actionRepository = actionRepository;
    }

    async Execute(token) {
        return await this._actionRepository.validatePasswordResetToken(token);
    }
}

module.exports = PasswordTokenValidator;
