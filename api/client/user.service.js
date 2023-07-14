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
    uploadPicture: (userId, userImage, callBack) => {
        pool.query(
            `insert into photo (user_id,url) values (?,?)`,
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
    getUploadedPictures: (userId, callBack) => {
        pool.query(
            `select url from photo where user_id = ?`,
            [userId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSearchResult: (params, callBack) => {
        pool.query(
            `select user_details.firstName,user_details.lastName,user_details.user_id,user_details.town,user_details.country,user_details.email,user_profile.profile_picture_url 
            from user_details 
            inner join user_profile
            on user_details.user_id = user_profile.user_id
            where firstName like ? or lastName like ? or email like ?
            OR firstName LIKE ? OR lastName LIKE ? OR email LIKE ?`,
            params,
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
    followUser: (userId, followingId, callBack) => {
        pool.query(
            `insert into user_relationship (follower_id,following_id) values (?,?)`,
            [
                userId,
                followingId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    unfollowUser: (userId, followingId, callBack) => {
        pool.query(
            `delete from user_relationship where follower_id = ? and following_id = ?`,
            [
                userId,
                followingId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getFollowerStatus: (followerEmail, followingEmail,callBack) => {
        pool.query('SELECT COUNT(*) AS count FROM user_relationship WHERE follower_id = ? AND following_id = ?', 
        [followerEmail, followingEmail], 
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        }
        );
    },
    getFollowingCount: (userId, callBack) => {
        pool.query(
            `select count(*) as count from user_relationship where follower_id = ?`,
            [userId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getFollowerCount: (userId, callBack) => {
        pool.query(
            `select count(*) as count from user_relationship where following_id = ?`,
            [userId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPostCount:(userId,callBack)=>{
        pool.query(
            `select count(*) as count from photo where user_id = ?`,
            [userId],
            (error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    }
    
};