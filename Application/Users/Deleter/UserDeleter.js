const SessionTokenValidator = require('../../Sessions/SessionTokenValidator/SessionTokenValidator');
const SessionRepository = require('../../../Infrastructure/Sessions/SessionRepository');
const ActionTokenValidator = require('../../Actions/ActionTokenValidator/ActionTokenValidator');
const ActionRepository = require('../../../Infrastructure/Actions/ActionRepository');

class UserDeleter{
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    /**
     * Elimina la cuenta del usuario.
     * @param {Object} params - Debe incluir:
     *    dni: DNI del usuario.
     *    sessionToken: Token de sesión actual.
     *    actionToken: Token de acción para "DELETE-USER".
     */
    async Execute({ dni, sessionToken, actionToken }) {
        const sessionRepo = new SessionRepository();
        const sessionValidator = new SessionTokenValidator(sessionRepo);
        await sessionValidator.Execute(dni, sessionToken);

        const actionRepo = new ActionRepository();
        const actionValidator = new ActionTokenValidator(actionRepo, 'DELETE-USER');
        await actionValidator.Execute(actionToken);

        await this._userRepository.Delete(dni);

        return { message: 'User account deleted successfully' };
    }
}

module.exports = UserDeleter;