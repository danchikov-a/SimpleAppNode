module.exports = class Bucket {
    static getBucketElement(user_id, shawarma_id) {
        return `SELECT * FROM bucket WHERE user_id = ${user_id} and shawarma_id = ${shawarma_id}`;
    }

    static updateBucketElement(user_id, shawarma_id, quantity) {
        console.log('sql', `UPDATE bucket SET quantity = ${quantity} WHERE user_id = ${user_id} and shawarma_id = ${shawarma_id};`);
        if (quantity !== 0) {
            return `UPDATE bucket SET quantity = ${quantity} WHERE user_id = ${user_id} and shawarma_id = ${shawarma_id};`;
        } else {
            return `DELETE FROM bucket WHERE user_id = ${user_id} and shawarma_id = ${shawarma_id};`;
        }
    }

    static addBucketElement(user_id, shawarma_id) {
        return `INSERT INTO bucket (user_id, shawarma_id, quantity) VALUES (${user_id}, ${shawarma_id}, 1)`;
    }

    static getAmountOfBucketElements(user_id) {
        console.log('sql', `SELECT sum(quantity) from bucket where user_id = ${user_id};`);
        return `SELECT sum(quantity) as quantity from bucket where user_id = ${user_id};`;
    }

    static getBucketItems(user_id) {
        return `SELECT * FROM shawarma join bucket on shawarma.id = bucket.shawarma_id WHERE user_id = ${user_id}`;
    }

    static clearBucket(user_id) {
        return `DELETE FROM bucket WHERE user_id = ${user_id}`;
    }
}