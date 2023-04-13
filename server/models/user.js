module.exports = class User {

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    save() {
        return `INSERT INTO users(name, email, password) \
                     VALUES('${this.name}','${this.email}', '${this.password}')`;
    }

    getUser() {
        return `SELECT password FROM users where email = '${this.email}'`;
    }
}