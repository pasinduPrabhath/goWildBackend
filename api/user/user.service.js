const pool = require('../../config/database');
const {get} = require('./user.router');

module.exports = {
    create: (data, callBack) => {
        if(!data.email){
            return callBack("Email is required");
        }
        pool.query(
            `insert into user(firstName,lastName,email,password,birthday,country,town,mobileNumber,gender,sp,nicNumber,timestamp) values(?,?,?,?,?,?,?,?,?,?,?,?)`,
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
            `select * from user where email=? && password=?`,
            [
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};