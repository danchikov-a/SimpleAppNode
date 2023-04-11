module.exports = class User {

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    save() {
        console.log(this);
        return `INSERT INTO users(name, email, password) \
                     VALUES('${this.name}','${this.email}', '${this.password}')`;
    }
}