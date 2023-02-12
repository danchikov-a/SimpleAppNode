module.exports = class Shawarma {

    constructor(name, weight, date, fileName) {
        this.name = name;
        this.weight = weight;
        this.date = date;
        this.fileName = fileName;
    }

    save() {
        return `INSERT INTO shawarma(name, weight, date, fileName) \
                     VALUES('${this.name}','${this.weight}', '${this.date}', '${this.fileName}')`;
    }

    static delete(id) {
        return `DELETE FROM shawarma WHERE id='${id}'`;
    }

    static update(id, pass) {
        return `UPDATE journeys SET pass = '${pass}' WHERE id = ${id}`;
    }

    static index() {
        return `SELECT * FROM shawarma`;
    }
}