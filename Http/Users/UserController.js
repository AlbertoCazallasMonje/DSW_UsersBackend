const UserRegister = require('../../Application/Users/Register/UserRegister');
const UserLogger = require('../../Application/Users/Logger/UserLogger');
const UserRepository = require('../../Infrastructure/Users/UserRepository');
const UserUpdater = require("../../Application/Users/Updater/UserUpdater");

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
}

module.exports = UserController;