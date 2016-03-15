var mysql = require('mysql');
var config = require('./config.json')

var pool = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASS,
    database: config.MYSQL_DB,
    connectionLimit: 10,
    supportBigNumbers: true
});

exports.getQuery = function(query, params, callback) {
    // Get a connection from the pool
    pool.getConnection(function(err, connection) {
        // Handle errors
        if (err) {
            console.log(err);
            callback(true);
            return;
        }
        
        // Execute the query
        connection.query(query, params, function(err, results) {
            connection.release();
            
            // Handle errors
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            
            // Give back results
            callback(false, results);
        });
    });
}
