const SessionRepository       = require('../../../Infrastructure/Sessions/SessionRepository');
const SessionTokenValidator   = require('../../Sessions/SessionTokenValidator/SessionTokenValidator');
const ActionRepository        = require('../../../Infrastructure/Actions/ActionRepository');
const ActionTokenValidator    = require('../../Actions/ActionTokenValidator/ActionTokenValidator');

class UserBlocker {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async Execute(sessionToken, actionToken, blockedEmail) {
        const sessionRepo  = new SessionRepository();
        const sessionVal   = new SessionTokenValidator(sessionRepo);
        const session      = await sessionVal.Execute(sessionToken);
        const actionRepo   = new ActionRepository();
        const actionVal    = new ActionTokenValidator(actionRepo);
        await actionVal.Execute(actionToken, 'BLOCK-USER');
        const blockedUser = await this._userRepository.GetByEmail(blockedEmail);
        if (!blockedUser) {
            throw new Error('User not found.');
        }
        const blockedDni = blockedUser.u_dni;

        if (session.u_dni === blockedDni) {
            throw new Error('You cannot block yourself.');
        }

        await this._userRepository.BlockUser(session.u_dni, blockedDni);
    }
}
module.exports = UserBlocker;