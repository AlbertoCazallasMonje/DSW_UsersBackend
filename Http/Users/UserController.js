const UserRegister = require('../../Application/Users/Register/UserRegister');
const UserLogger = require('../../Application/Users/Logger/UserLogger');
const UserRepository = require('../../Infrastructure/Users/UserRepository');
const UserUpdater = require("../../Application/Users/Updater/UserUpdater");
const SessionRepository = require("../../Infrastructure/Sessions/SessionRepository");
const UserLoggerout = require("../../Application/Users/Loggerout/UserLoggerout");
const UserDeleter = require("../../Application/Users/Deleter/UserDeleter");
const UserFinder = require("../../Application/Users/Finder/UserFinder");
const ActionRepository = require("../../Infrastructure/Actions/ActionRepository");
const UserPasswordReseter = require("../../Application/Users/Reseter/UserPasswordReseter");
const UserEmailFinder = require("../../Application/Users/EmailFinder/UserEmailFinder");
const UserLoader = require("../../Application/Users/Loader/UserLoader");
const FrequentUsersFinder = require("../../Application/Users/FrequentFinder/FrequentUsersFinder");
const UserBlocker = require("../../Application/Users/Blocker/UserBlocker");


class UserController {
    async Register(req, res) {
        try {
            const userRepository = new UserRepository();
            const userRegister = new UserRegister(userRepository);
            await userRegister.Execute(req.body);
            res.status(201).json({message: 'User created successfully'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async Login(req, res) {
        try {
            const userRepository = new UserRepository();
            const userLogger = new UserLogger(userRepository);

            const loginResult = await userLogger.Execute(req.body);
            res.status(200).json(loginResult);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async Update(req, res) {
        try {
            const userRepository = new UserRepository();
            const userUpdater = new UserUpdater(userRepository);
            await userUpdater.Execute(req.body);
            res.status(200).json({message: 'User updated successfully'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async Logout(req, res) {
        try {
            const {sessionToken} = req.body;
            const sessionRepository = new SessionRepository();
            const userLoggerout = new UserLoggerout(sessionRepository);
            const result = await userLoggerout.Execute({sessionToken});
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async DeleteAccount(req, res) {
        try {
            const {sessionToken, actionToken} = req.body;
            const userRepository = new UserRepository();
            const userDeleteAccount = new UserDeleter(userRepository);
            const result = await userDeleteAccount.Execute({sessionToken, actionToken});
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async FindUser(req, res) {
        try {
            const {sessionToken, actionToken} = req.body;
            const userRepository = new UserRepository();
            const userFinder = new UserFinder(userRepository);
            const result = await userFinder.Execute(sessionToken, actionToken);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async ResetPassword(req, res) {
        try {

            const {actionToken} = req.params;

            const {newPassword} = req.body;

            const userRepository = new UserRepository();
            const actionRepository = new ActionRepository();

            const userPasswordReseter = new UserPasswordReseter(userRepository, actionRepository);

            await userPasswordReseter.Execute({actionToken, newPassword});

            res.status(200).json({message: 'Password successfully updated.'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async FindUserByEmail(req, res) {
        try {
            const {sessionToken, findReceiverToken, email} = req.body;

            const userRepository = new UserRepository();
            const userEmailFinder = new UserEmailFinder(userRepository);
            const result = await userEmailFinder.Execute(sessionToken, findReceiverToken, email);

            res.status(200).json({u_dni: result});

        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async AdminLoadUsers(req, res) {
        try {
            const {sessionToken, actionToken} = req.body;
            const userRepository = new UserRepository();
            const userLoader = new UserLoader(userRepository);
            const users = await userLoader.Execute({sessionToken, actionToken});
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async GetFrequentUsers(req, res) {
        try {
            const {sessionToken, actionToken, limit} = req.body;

            const userRepository = new UserRepository();
            const frequentUsersUC = new FrequentUsersFinder(userRepository);
            const users = await frequentUsersUC.Execute(sessionToken, actionToken, limit);

            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async BlockUser(req, res) {
        try {
            const {sessionToken, actionToken, blockedDni} = req.body;
            const userRepository = new UserRepository();
            const blockUserUc = new UserBlocker(userRepository);
            await blockUserUc.Execute(sessionToken, actionToken, blockedDni);
            res.status(200).json({message: 'User blocked successfully.'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = UserController;