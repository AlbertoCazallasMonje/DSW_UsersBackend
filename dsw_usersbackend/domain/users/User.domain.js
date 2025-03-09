const User = require('./User');

class UserDomain {

    static Create({ dni, name, lastName, age, email, address, country }) {
        return new User({ dni, name, lastName, age, email, address, country });
    }
}
module.exports = UserDomain;