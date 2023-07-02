const pool = require('../../config/database');
module.exports = {
    checkLoginEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM user_details WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error,null);
                }
                if (results.length === 0) {
                    return callBack(null, []); // Return an empty array if no results found
                  }
                return callBack(null, results);
            }
        );
    },
  
    registerBasicUser: (data, callBack) => {
        pool.query(
            `insert into user_details(firstName,lastName,email,password,birthday,country,town,mobileNumber,gender,timestamp) values(?,?,?,?,?,?,?,?,?,?)`,
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
    regServiceProvider: (data, callBack) => {
        pool.query(
            `insert into service_provider(user_id,nicNumber,user_id_img_front,user_id_img_rear,is_approved) values(?,?,?,?,?)`,
            [
                data.userIdF,
                data.nicNumber,
                data.userImageFront,
                data.userImageRear,
                data.isApproved
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getServProvDetails: (data, callBack) => {
        pool.query(
            `select user_details.firstName,user_details.lastName,user_details.country,user_details.email,user_details.birthday,user_details.town,user_details.gender,service_provider.nicNumber,service_provider.user_id_img_front,service_provider.user_id_img_rear,service_provider.is_approved,user_details.user_id 
            FROM user_details
            INNER JOIN service_provider
            ON user_details.user_id = service_provider.user_id
            where service_provider.is_approved = "pending"`,
            (error, results) => {
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
    },
    approveTheServiceProvider: (data, callBack) => {
        if (!data.userId) {
            return callBack(new Error('userId is undefined'));
          }
        pool.query(
            `update service_provider set is_approved = ? where user_id = ?`,
            [
                data.approvalStatus,
                data.userId
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