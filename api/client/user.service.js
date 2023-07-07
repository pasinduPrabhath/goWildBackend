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
    getUserDetail : (email, callBack) => {
        pool.query(
            `select firstName,lastName from user_details where email = ?`,
            [email],
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
    setUserProfilePicture: (email, userImage, callBack) => {
        pool.query(
            `update user_details set profile_picture_url = ? where email = ?`,
            [
                userImage,
                email
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