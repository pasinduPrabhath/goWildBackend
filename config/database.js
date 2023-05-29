const {createPool} = require('mysql2');

const pool = createPool({
    port: 3306,
    host: '127.0.0.1',
    user: '',
    password: '',
    database : 'gowild',
    connectionLimit: 10
});

module.exports = pool;