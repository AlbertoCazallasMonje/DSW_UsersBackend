const SessionRepository = require("../../../Infrastructure/Sessions/SessionRepository");
const SessionTokenValidator = require("../../Sessions/SessionTokenValidator/SessionTokenValidator");
const ActionRepository = require("../../../Infrastructure/Actions/ActionRepository");
const ActionTokenValidator = require("../../Actions/ActionTokenValidator/ActionTokenValidator");

class UserFinder {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async Execute(sessionToken, actionToken) {
        const sessionRepo = new SessionRepository();
        const sessionValidator = new SessionTokenValidator(sessionRepo);
        const session = await sessionValidator.Execute(sessionToken);

        const actionRepo = new ActionRepository();
        const actionValidator = new ActionTokenValidator(actionRepo);
        await actionValidator.Execute(actionToken, 'FIND-USER');

        const dni = session.u_dni;
        const user = await this._userRepository.GetByDni(dni);
        if (!user) {
            throw new Error('User not found.');
        }

        return user;
    }
}

module.exports = UserFinder;