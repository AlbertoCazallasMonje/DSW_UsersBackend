const SessionRepository = require('../../Infrastructure/Sessions/SessionRepository');
const SessionTokenValidator = require('../../Application/Sessions/SessionTokenValidator/SessionTokenValidator');
const ActionTokenGenerator = require('../../Application/Actions/ActionTokenGenerator/ActionTokenGenerator');
const ActionRepository = require('../../Infrastructure/Actions/ActionRepository');

class ActionController {

    async RequestActionToken(req, res) {
        try {
            const { dni, sessionToken, actionCode } = req.body;
            const sessionRepo = new SessionRepository();
            const session = await sessionRepo.findByUserDni(dni);
            if (!session) {
                throw new Error('Session not found.');
            }
            const sessionValidator = new SessionTokenValidator(sessionRepo);
            await sessionValidator.Execute(dni, sessionToken);

            const actionRepo = new ActionRepository();
            const actionTokenGenerator = new ActionTokenGenerator(actionRepo);
            const actionToken = await actionTokenGenerator.Execute({ refreshTokenId: session.id, actionCode });

            res.status(200).json({ actionToken });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ActionController;
