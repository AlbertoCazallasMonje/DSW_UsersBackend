const User = require('./User');

class UserDomain {

    static Create({dni, name, lastName, age, email, password, address, country, isAdmin}) {
        return new User({dni, name, lastName, age, email, password, address, country, isAdmin});
    }
}

module.exports = UserDomain;