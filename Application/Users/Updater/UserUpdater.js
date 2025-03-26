const SessionTokenValidator = require('../../Sessions/SessionTokenValidator/SessionTokenValidator');
const SessionRepository = require('../../../Infrastructure/Sessions/SessionRepository');
const ActionTokenValidator = require('../../Actions/ActionTokenValidator/ActionTokenValidator');
const ActionRepository = require('../../../Infrastructure/Actions/ActionRepository');
const UserDomain = require('../../../Domain/Users/User.domain');

class UserUpdater {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }


    async Execute({token, actionToken, dni, name, lastName, age, email, address, country}) {
        const sessionRepo = new SessionRepository();
        const sessionValidator = new SessionTokenValidator(sessionRepo);
        const session = await sessionValidator.Execute(token);

        if (!session) {
            throw new Error('Invalid session.');
        }

        const actionRepo = new ActionRepository();
        const actionValidator = new ActionTokenValidator(actionRepo);
        await actionValidator.Execute(actionToken, 'UPDATE-USER');

        const currentUser = await this._userRepository.GetAllUserData(dni);
        if (!currentUser) {
            throw new Error('User not found.');
        }

        const password = currentUser.u_password;
        const isAdmin = currentUser.is_admin;
        const updatedUser = UserDomain.Create({dni, name, lastName, age, email, password , address, country, isAdmin});
        await this._userRepository.Update(updatedUser);
    }
}

module.exports = UserUpdater;