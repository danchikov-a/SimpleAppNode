module.exports = class Bucket {
    static createOrder(user_id, locationId, userName, userPhoneNumber, amountOfMinutes) {
        return `INSERT INTO shawarma_order (user_id, amount_of_minutes, export_point, name, phone_number)
            VALUES (${user_id}, ${amountOfMinutes}, ${locationId}, "${userName}", "${userPhoneNumber}")`;
    }

    static getOrders(user_id) {
        return `SELECT * FROM shawarma_order WHERE user_id = ${user_id} ORDER BY created_at DESC`;
    }
}