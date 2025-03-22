const SessionTokenValidator = require('../../Sessions/SessionTokenValidator/SessionTokenValidator');
const SessionRepository = require('../../../Infrastructure/Sessions/SessionRepository');
const ActionTokenValidator = require('../../Actions/ActionTokenValidator/ActionTokenValidator');
const ActionRepository = require('../../../Infrastructure/Actions/ActionRepository');

class UserDeleter{
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async Execute({ sessionToken, actionToken }) {
        const sessionRepo = new SessionRepository();
        const sessionValidator = new SessionTokenValidator(sessionRepo);
        const session = await sessionValidator.Execute(sessionToken);

        const actionRepo = new ActionRepository();
        const actionValidator = new ActionTokenValidator(actionRepo);
        await actionValidator.Execute(actionToken, 'DELETE-USER');

        const dni = session.u_dni;
        await this._userRepository.Delete(dni);

        return { message: 'User account deleted successfully' };
    }
}

module.exports = UserDeleter;