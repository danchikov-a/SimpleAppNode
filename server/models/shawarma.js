module.exports = class Shawarma {

    constructor(name, weight, fileName, price) {
        this.name = name;
        this.weight = weight;
        this.fileName = fileName;
        this.price = price;
    }

    save() {
        return `INSERT INTO shawarma(name, weight, fileName, price) \
                     VALUES('${this.name}','${this.weight}', '${this.fileName}', '${this.price}')`;
    }

    static delete(id) {
        return `DELETE FROM shawarma WHERE id='${id}'`;
    }

    update(id) {
        return `UPDATE shawarma set name = '${this.name}', weight = ${this.weight}, \
 fileName = '${this.fileName}', price = ${this.price} WHERE id = ${id}`;
    }

    static index() {
        return `SELECT * FROM shawarma ORDER BY id desc`;
    }
}