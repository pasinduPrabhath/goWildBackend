const pool = require('../../config/database');
module.exports = {
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
};