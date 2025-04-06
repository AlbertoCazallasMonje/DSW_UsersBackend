const ActionRepository = require("../../../Infrastructure/Actions/ActionRepository");
const ActionTokenValidator = require("../../Actions/ActionTokenValidator/ActionTokenValidator");
const SessionRepository = require("../../../Infrastructure/Sessions/SessionRepository");
const SessionTokenValidator = require("../../Sessions/SessionTokenValidator/SessionTokenValidator");

class UserLoader{

    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async Execute({ sessionToken, actionToken }) {
        const sessionRepo = new SessionRepository();
        const sessionValidator = new SessionTokenValidator(sessionRepo);
        const session = await sessionValidator.Execute(sessionToken);

        const user = await this._userRepository.GetByDni(session.u_dni);
        if (!user) {
            throw new Error('User not found.');
        }
        if (!user.is_admin) {
            throw new Error('User is not an admin.');
        }

        const actionRepo = new ActionRepository();
        const actionValidator = new ActionTokenValidator(actionRepo);
        await actionValidator.Execute(actionToken, 'ADMIN-LOAD-USERS');

        const users = await this._userRepository.LoadUsers();
        return users;
    }
}
module.exports = UserLoader;