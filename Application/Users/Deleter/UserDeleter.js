const SessionTokenValidator = require('../../Sessions/SessionTokenValidator/SessionTokenValidator');
const SessionRepository = require('../../../Infrastructure/Sessions/SessionRepository');
const ActionTokenValidator = require('../../Actions/ActionTokenValidator/ActionTokenValidator');
const ActionRepository = require('../../../Infrastructure/Actions/ActionRepository');

class UserDeleter{
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async Execute({ dni, sessionToken, actionToken }) {
        const sessionRepo = new SessionRepository();
        const sessionValidator = new SessionTokenValidator(sessionRepo);
        await sessionValidator.Execute(dni, sessionToken);

        const actionRepo = new ActionRepository();
        const actionValidator = new ActionTokenValidator(actionRepo);
        await actionValidator.Execute(actionToken, 'DELETE-USER');

        await this._userRepository.Delete(dni);

        return { message: 'User account deleted successfully' };
    }
}

module.exports = UserDeleter;