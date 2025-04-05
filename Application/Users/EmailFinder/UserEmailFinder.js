const SessionRepository = require("../../../Infrastructure/Sessions/SessionRepository");
const SessionTokenValidator = require("../../Sessions/SessionTokenValidator/SessionTokenValidator");
const ActionRepository = require("../../../Infrastructure/Actions/ActionRepository");
const ActionTokenValidator = require("../../Actions/ActionTokenValidator/ActionTokenValidator");

class UserEmailFinder{
    constructor(userRepository) {
        this.userRepository = userRepository;
    }


    async Execute(sessionToken, actionToken, email) {
        const sessionRepo = new SessionRepository();
        const sessionValidator = new SessionTokenValidator(sessionRepo);
        const session = await sessionValidator.Execute(sessionToken);
        if (!session) {
            throw new Error('Session not found.');
        }

        const actionRepo = new ActionRepository();
        const actionValidator = new ActionTokenValidator(actionRepo);
        const validate = await actionValidator.Execute(actionToken, 'FIND-USER');
        if (!validate) {
            throw new Error('Action token not valid.');
        }

        const user = await this.userRepository.GetByEmail(email);
        if (!user) {
            throw new Error('User not found.');
        }
        return user.u_dni;
    }
}
module.exports = UserEmailFinder;