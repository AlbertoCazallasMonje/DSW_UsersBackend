const SessionRepository       = require('../../../Infrastructure/Sessions/SessionRepository');
const SessionTokenValidator   = require('../../Sessions/SessionTokenValidator/SessionTokenValidator');
const ActionRepository        = require('../../../Infrastructure/Actions/ActionRepository');
const ActionTokenValidator    = require('../../Actions/ActionTokenValidator/ActionTokenValidator');

class FrequentUsersFinder {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async Execute(sessionToken, actionToken, limit = 5) {
        const sessionRepo    = new SessionRepository();
        const sessionVal     = new SessionTokenValidator(sessionRepo);
        const session        = await sessionVal.Execute(sessionToken);

        const actionRepo     = new ActionRepository();
        const actionVal      = new ActionTokenValidator(actionRepo);
        await actionVal.Execute(actionToken, 'FIND-USER');

        const dni       = session.u_dni;
        const frequent  = await this._userRepository.GetFrequentUsers(dni, limit);

        return frequent;
    }
}

module.exports = FrequentUsersFinder;