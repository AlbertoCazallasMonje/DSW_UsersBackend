const SessionTokenValidator = require('../../Sessions/SessionTokenValidator/SessionTokenValidator');
const SessionRepository = require('../../../Infrastructure/Sessions/SessionRepository');
const ActionTokenValidator = require('../../Actions/ActionTokenValidator/ActionTokenValidator');
const ActionRepository = require('../../../Infrastructure/Actions/ActionRepository');
const UserDomain = require('../../../Domain/Users/User.domain');

class UserUpdater {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }


    async Execute({token, actionToken, dni, name, lastName, age, email, password, address, country}) {
        const sessionRepo = new SessionRepository();
        const sessionValidator = new SessionTokenValidator(sessionRepo);
        await sessionValidator.Execute(dni, token);

        const actionRepo = new ActionRepository();
        const actionValidator = new ActionTokenValidator(actionRepo);
        await actionValidator.Execute(actionToken);

        if (!password) {
            const currentUser = await this._userRepository.GetByDni(dni);
            if (!currentUser) {
                throw new Error('User not found.');
            }
            password = currentUser.u_password;
        }
        const updatedUser = UserDomain.Create({dni, name, lastName, age, email, password, address, country});
        await this._userRepository.Update(updatedUser);
    }
}

module.exports = UserUpdater;