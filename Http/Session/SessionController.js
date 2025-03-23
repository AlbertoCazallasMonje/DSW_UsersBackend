const SessionRepository = require("../../Infrastructure/Sessions/SessionRepository");
const SessionTokenValidator = require("../../Application/Sessions/SessionTokenValidator/SessionTokenValidator");

class SessionController {

    async ValidateToken(req, res) {
        try {
            const sessionRepository = new SessionRepository();
            const sessionValidator = new SessionTokenValidator(sessionRepository);
            await sessionValidator.Execute(req.body.sessionToken);

            res.status(200).json({message: 'Token is valid'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}
module.exports = SessionController;