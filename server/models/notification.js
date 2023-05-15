module.exports = class Notification {
    static createNotification(message) {
        return `INSERT INTO notification (message) VALUES ("${message}")`;
    }

    static getNotifications() {
        return `SELECT * FROM notification`;
    }
}