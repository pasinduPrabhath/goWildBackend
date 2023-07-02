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