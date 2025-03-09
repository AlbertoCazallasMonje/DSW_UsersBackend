const UserRegistrator = require('../application/users/register/UserRegistrator');
const UserRepository = require('../infrastructure/users/UserRepository');

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
}
module.exports = new UserController();