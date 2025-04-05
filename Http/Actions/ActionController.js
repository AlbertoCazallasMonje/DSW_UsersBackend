const SessionRepository = require('../../Infrastructure/Sessions/SessionRepository');
const SessionTokenValidator = require('../../Application/Sessions/SessionTokenValidator/SessionTokenValidator');
const ActionTokenGenerator = require('../../Application/Actions/ActionTokenGenerator/ActionTokenGenerator');
const ActionRepository = require('../../Infrastructure/Actions/ActionRepository');
const ActionTokenValidator = require("../../Application/Actions/ActionTokenValidator/ActionTokenValidator");
const {PasswordTokenGenerator} = require("../../Application/Actions/PasswordTokenGenerator/PasswordTokenGenerator");
const UserRepository = require("../../Infrastructure/Users/UserRepository");
const PasswordTokenValidator = require("../../Application/Actions/PasswordTokenValidator/PasswordTokenValidator");
const {sendEmail} = require("../Services/SmtpService");

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

    async ValidateActionToken(req, res) {
        try {
            const {sessionToken, actionToken, actionCode} = req.body;

            const sessionRepo = new SessionRepository();
            const sessionValidator = new SessionTokenValidator(sessionRepo);
            await sessionValidator.Execute(sessionToken);

            const actionRepo = new ActionRepository();
            const actionTokenValidator = new ActionTokenValidator(actionRepo);
            await actionTokenValidator.Execute(actionToken, actionCode);
            res.status(200).json({message: 'Token is valid'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async RequestPasswordReset(req, res) {
        try {
            const {email, actionCode} = req.body;
            const userRepo = new UserRepository();
            const actionRepo = new ActionRepository();
            const passwordTokenGenerator = new PasswordTokenGenerator(actionRepo, userRepo);

            const resetToken = await passwordTokenGenerator.Execute({email, actionCode});
            const resetUrl = `${process.env.REACT_APP_FRONT_URL}/reset/${resetToken}`;
            await sendEmail({
                to: email,
                subject: 'Password Recovery',
                text: `Here is your link for your password recovery (you have 1 hour to change your password): ${resetUrl}`,
                html: `<p>Password Recovery.</p><p>Here is your link for your password recovery (you have 1 hour to change your password):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
            });
            res.status(200).json({
                message: 'Recovery token generated.',
                token: resetToken
            });
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async ValidatePasswordResetToken(req, res) {
        try {
            const {token} = req.params;

            const actionRepo = new ActionRepository();
            const passwordTokenValidator = new PasswordTokenValidator(actionRepo);
            await passwordTokenValidator.Execute(token);

            res.status(200).json({message: 'Token is valid'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

module
    .exports = ActionController;
