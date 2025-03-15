const UserRegister = require('../../Application/Users/Register/UserRegister');
const UserRepository = require('../../Infrastructure/Users/UserRepository');

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
}
module.exports = UserController;