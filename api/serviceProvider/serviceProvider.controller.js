const {regServiceProvider} = require('./serviceProvider.services');
const{checkLoginEmail,registerBasicUser} = require('../client/user.service');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
module.exports = {
registerServiceProvider: (req, res) => {
    const {
        firstName,
        lastName,
        birthday,
        country,
        town,
        mobileNumber,
        gender,
        email,
        password,
        nicNumber,
        isApproved,
        userImageFront,
        userImageRear,
        timestamp
      } = req.body;

      checkLoginEmail(email , (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Database connection error',
          });
        }
        if (results.length > 0) {
          return res.status(400).json({
            success: 0,
            message: 'Email already exists',
          });
        }
    //
        if(results.length === 0){
        const saltRounds = 10;
        var userIdF;
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        const userBody = {
          firstName,
          lastName,
          email,
          password: encryptedPassword,
          birthday,
          country,
          town,
          mobileNumber,
          gender,
          timestamp
        };
        
        registerBasicUser(userBody, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: 'Database connection error',
              });
            }
            userIdF = results.insertId;
            console.log(results);
            const serviceProviderBody ={
                nicNumber,
                userIdF,
                userImageFront,
                userImageRear,
                isApproved,
            };
            regServiceProvider(serviceProviderBody,(err, results)=>{
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                      success: 0,
                      message: 'Database connection error',
                    });
                  }
                  return res.status(200).json({
                    success: 1,
                    data: results,

                });
            });
          });
        }});
      },};