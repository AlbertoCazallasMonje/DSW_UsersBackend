class User {
    constructor({dni, name, lastName, age, email, password, address, country, isAdmin = false}) {
        this.setDni(dni);
        this.setName(name);
        this.setLastName(lastName);
        this.setAge(age);
        this.setEmail(email);
        this.setPassword(password);
        this.setAddress(address);
        this.setCountry(country);
        this._isAdmin = isAdmin;
    }

    // Getters
    getDni() {
        return this._dni;
    }

    getName() {
        return this._name;
    }

    getLastName() {
        return this._lastName;
    }

    getAge() {
        return this._age;
    }

    getEmail() {
        return this._email;
    }

    getPassword() {
        return this._password;
    }

    getAddress() {
        return this._address;
    }

    getCountry() {
        return this._country;
    }

    get isAdmin() {
        return this._isAdmin;
    }

    // Setters con validación
    setDni(dni) {
        if (!dni) {
            throw new Error('DNI is required');
        }
        if (dni.length > 9) {
            throw new Error('DNI format is not valid');
        }
        this._dni = dni;
    }

    setName(name) {
        if (!name) {
            throw new Error('User name is required');
        }
        if (name.length > 50) {
            throw new Error('User name format is not valid');
        }
        this._name = name;
    }

    setLastName(lastName) {
        if (!lastName) {
            throw new Error('User Last Name is required');
        }
        if (lastName.length > 100) {
            throw new Error('User Last Name format is not valid');
        }
        this._lastName = lastName;
    }

    setAge(age) {
        if (typeof age !== 'number') {
            throw new Error('Age must be a number');
        }
        if (age <= 18) {
            throw new Error('User must be at least 18 years old');
        }
        this._age = age;
    }

    setEmail(email) {
        if (!email) {
            throw new Error('User email is required');
        }
        if (!this._validateEmail(email)) {
            throw new Error('Invalid email format');
        }
        if (email.length > 100) {
            throw new Error('Invalid email format');
        }
        this._email = email;
    }

    setPassword(password) {
        if (!password) {
            throw new Error('User password is required');
        }
        if (!this._validatePassword(password)) {
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character');
        }
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        this._password = password;
    }

    setAddress(address) {
        if (!address) {
            throw new Error('User address is required');
        }
        if (address.length > 100) {
            throw new Error('User address format is not valid');
        }
        this._address = address;
    }

    setCountry(country) {
        if (!country || country.length !== 2) {
            throw new Error('Country format is not valid');
        }
        this._country = country.toUpperCase();
    }

    _validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    _validatePassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
    }
}

module.exports = User;
