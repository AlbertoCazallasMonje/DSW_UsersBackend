class UserPasswordReseter {
    constructor(userRepository, actionRepository) {
        this._userRepository = userRepository;
        this._actionRepository = actionRepository;
    }

    async Execute({actionToken, newPassword}) {
        const resetToken = await this._actionRepository.validatePasswordResetToken(actionToken);

        const email = resetToken.email;
        if (!email) {
            throw new Error('No email found for this action token.');
        }

        const userRecord = await this._userRepository.GetByEmail(email);
        if (!userRecord) {
            throw new Error('User not found.');
        }

        if (newPassword === userRecord.u_password) {
            throw new Error('New password cannot be the same as the old one.');
        }

        userRecord.u_password = newPassword;
        await this._userRepository.UpdateUserPassword(userRecord.u_dni, newPassword);

        return true;
    }
}
module.exports = UserPasswordReseter;