const {createPool} = require('mysql2');

const pool = createPool({
    port: 3306,
    host: 'localhost',
    user: '',
    password: '',
    database : 'gowild',
    connectionLimit: 10
});

module.exports = pool;