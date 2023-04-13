const mysql = require("mysql2");

const connection = mysql.createPool({
    host: "localhost",
    user: "Danchikov",
    database: "shawarma",
    password: "Temastrelok123",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

function executeQuery(sql, callback) {
    connection.getConnection(async function (error, connection) {
        if (error) {
            return callback(error, null);
        } else {
            if (connection) {
                connection.query(sql, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        return callback(error, null);
                    }
                    console.log(results);
                    return callback(null, results);
                });
            }
        }
    });
}

function query(sql, callback) {
    executeQuery(sql, async function (error, data) {
        if (error) {
            return console.log(error);
        }
        callback(null, data);
    });
}

module.exports = {
    query: query,
    connection: connection
}