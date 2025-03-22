const UserRegister = require('../../Application/Users/Register/UserRegister');
const UserLogger = require('../../Application/Users/Logger/UserLogger');
const UserRepository = require('../../Infrastructure/Users/UserRepository');
const UserUpdater = require("../../Application/Users/Updater/UserUpdater");
const SessionRepository = require("../../Infrastructure/Sessions/SessionRepository");
const UserLoggerout = require("../../Application/Users/Loggerout/UserLoggerout");
const UserDeleter = require("../../Application/Users/Deleter/UserDeleter");
const UserFinder = require("../../Application/Users/Finder/UserFinder");

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
}

module.exports = UserController;