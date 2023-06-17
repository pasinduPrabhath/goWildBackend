const pool = require('../../config/database');
module.exports = {
    
    create: (data, callBack) => {
        if(!data.firstName){
            return callBack("First Name is required");
        }
        pool.query(
            `insert into user(firstName,lastName,email,password,birthday,country,town,mobileNumber,gender,sp,nicNumber,userRole,userImage_front,userImage_rear,timestamp) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.email,
                data.password,
                data.birthday,
                data.country,
                data.town,
                data.mobileNumber,
                data.gender,
                data.sp,
                data.nicNumber,
                data.userRole,
                data.userImageFront,
                data.userImageRear,
                data.timestamp
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkLoginEmail: (data, callBack) => {
        pool.query(
            `SELECT * FROM user WHERE email = ?`,
            [data.email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                if (results.length === 0) {
                    return callBack(null, null);
                }
                return callBack(null, results);
            }
        );
    },
    getNumberOfUsers: (data, callBack) => {
        pool.query(
            `select count(*) as numberOfUsers from user`,
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
    }
};