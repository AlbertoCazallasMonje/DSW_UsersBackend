const SessionRepository = require("../../../Infrastructure/Sessions/SessionRepository");
const SessionTokenValidator = require("../../Sessions/SessionTokenValidator/SessionTokenValidator");
const ActionRepository = require("../../../Infrastructure/Actions/ActionRepository");
const ActionTokenValidator = require("../../Actions/ActionTokenValidator/ActionTokenValidator");
const UserUpdateResponse = require("../UserUpdateResponse");

class UserFinder{
    constructor(userRepository){
        this._userRepository = userRepository;
    }

    async Execute(dni, sessionToken, actionToken){
        const sessionRepo = new SessionRepository();
        const sessionValidator = new SessionTokenValidator(sessionRepo);
        await sessionValidator.Execute(dni, sessionToken);

        const actionRepo = new ActionRepository();
        const actionValidator = new ActionTokenValidator(actionRepo);
        await actionValidator.Execute(actionToken, 'FIND-USER');

        const user = await this._userRepository.GetByDni(dni);
        if(!user){
            throw new Error('User not found.');
        }
        return user;
    }
}
module.exports = UserFinder;