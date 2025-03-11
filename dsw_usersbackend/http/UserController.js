const UserRegistrator = require('../application/users/register/UserRegistrator');
const UserRepository = require('../infrastructure/users/UserRepository');
const UserLogger = require('../application/users/logger/UserLogger');
const UserUpdater = require('../application/users/updater/UserUpdater');

class UserController {
    async register(req, res) {
        try {
            const userRepository = new UserRepository();
            const userRegistrator = new UserRegistrator(userRepository);
            await userRegistrator.Execute(req.body);
            res.status(201).json({message: 'User created successfully'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async login(req, res) {
        try {
            const userRepository = new UserRepository();
            const userLogger = new UserLogger(userRepository);
            const token = await userLogger.Execute(req.body);
            res.status(200).json({token});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async update(req, res) {
        try {
            const userRepository = new UserRepository();
            const userUpdater = new UserUpdater(userRepository);
            await userUpdater.Execute(req.body);
            res.status(200).json({message: 'User updated successfully'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = new UserController();