const SessionRepository = require('../../Infrastructure/Sessions/SessionRepository');
const SessionTokenValidator = require('../../Application/Sessions/SessionTokenValidator/SessionTokenValidator');
const ActionTokenGenerator = require('../../Application/Actions/ActionTokenGenerator/ActionTokenGenerator');
const ActionRepository = require('../../Infrastructure/Actions/ActionRepository');

class ActionController {

    async RequestActionToken(req, res) {
        try {
            const {sessionToken, actionCode} = req.body;

            const sessionRepo = new SessionRepository();
            const sessionValidator = new SessionTokenValidator(sessionRepo);
            const session = await sessionValidator.Execute(sessionToken);


            const actionRepo = new ActionRepository();
            const actionTokenGenerator = new ActionTokenGenerator(actionRepo);
            const actionToken = await actionTokenGenerator.Execute({
                refreshTokenId: session.id,
                actionCode
            });

            res.status(200).json({actionToken});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = ActionController;
