class UserUpdateResponse {
    constructor({ dni, name, lastName, age, email, address, country }) {
        this.dni = dni;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.address = address;
        this.country = country;
    }

    static ToOutput(user) {
        return new UserUpdateResponse({
            dni: user.getDni(),
            name: user.getName(),
            lastName: user.getLastName(),
            age: user.getAge(),
            email: user.getEmail(),
            address: user.getAddress(),
            country: user.getCountry(),
        });
    }
}

module.exports = UserUpdateResponse;