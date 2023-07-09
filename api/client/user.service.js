const pool = require('../../config/database');
const { get } = require('./user.router');
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
            `select user_details.firstName,user_details.lastName,user_details.user_id,user_profile.profile_picture_url 
            from user_details 
            inner join user_profile
            on user_details.user_id = user_profile.user_id
            where email = ?`,
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
    setProfilePicture: (userId, userImage, callBack) => {
        pool.query(
            `insert into user_profile (user_id,profile_picture_url) values (?,?)`,
            [
                userId,
                userImage
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProfilePicture: (userId, callBack) => {
        pool.query(
            `select profile_picture_url from user_profile where user_id = ?`,
            [userId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateProfilePicture: (userId, userImage, callBack) => {
        pool.query(
            `update user_profile set profile_picture_url = ? where user_id = ?`,
            [
                userImage,
                userId
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