module.exports = class Bucket {
    static createOrder(user_id) {
        return `INSERT INTO shawarma_order (user_id, amount_of_minutes) VALUES (${user_id}, 15)`;
    }

    static getOrders(user_id) {
        return `SELECT * FROM shawarma_order WHERE user_id = ${user_id}`;
    }
}