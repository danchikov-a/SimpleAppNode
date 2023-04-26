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
        return `SELECT * FROM users JOIN role_user on users.id = role_user.user_id  where email = '${this.email}'`;
    }
}