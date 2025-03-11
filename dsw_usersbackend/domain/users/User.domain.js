const User = require('./User');

class UserDomain {

    static Create({dni, name, lastName, age, email, password, address, country, lastLogin}) {
        return new User({dni, name, lastName, age, email, password, address, country, lastLogin});
    }
}

module.exports = UserDomain;