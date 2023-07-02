const pool = require('../../config/database');
module.exports = {
getNumberOfUsers: (data, callBack) => {
    pool.query(
        `select count(*) as numberOfUsers from user_details`,
        (error, results, fields) => {
            if (error) {
                if (typeof callBack === 'function') {
                    return callBack(error);
                }
                console.error(error);
                return;
            }
            if (typeof callBack === 'function') {
                return callBack(null, results);
            }
            console.log(results);
            return callBack(null, results);
        }
    );
},};