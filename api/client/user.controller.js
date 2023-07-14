const {checkLoginEmail,registerBasicUser,getUserDetail,setProfilePicture,updateProfilePicture,uploadPicture,getUploadedPictures,getSearchResult,followUser,getFollowerStatus,unfollowUser,getFollowingCount,getFollowerCount,getPostCount} = require('./user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;
function generateToken(user) {
    const payload = {
        userId: user.id,
        email: user.email,
        userRole: user.userRole
    };
    
    const options = {
        expiresIn: '1D'
    };
    return jwt.sign(payload, secret, options);
}

module.exports = {
    createClient: (req, res) => {
        const {
          firstName,
          lastName,
          email,
          password,
          birthday,
          country,
          town,
          mobileNumber,
          gender,
          profPicUrl,
          timestamp
        } = req.body;
      
        // Check if user with the same email already exists in the database
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

          if(results.length === 0){
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const encryptedPassword = bcrypt.hashSync(password, salt);
          const body = {
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
          registerBasicUser(body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: 'Database connection error',
              });
            }
           
         
          userId = results.insertId;
          setProfilePicture(userId, profPicUrl,(err, results) => {
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
          },);
        });
      }});},
    logInUser: (req, res) => {
        const { email, password } = req.body;
        checkLoginEmail(email , (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
                });
        }
        if (!results) {
            return res.json({
            success: 0,
            message: 'Invalid email or password',
            });
        }
        const user = results[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);
        
        if (!passwordMatch) {
            return res.json({
            success: 0,
            message: 'Invalid email or password',
            });
        }
        const token = generateToken(user);
        return res.status(200).json({
            success: 1,
            data: 'user logged in successfully',
            // role: user.userRole,
            token:token,
        });
});
    },
   
    checkExistingEmail: (req, res) => {
        const { email } = req.body;
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
            if(results.length === 0){
                return res.status(200).json({
                    success: 1,
                    message: 'Email is available',
                });
            }
        });
    },
    
    getUserDetailsForProfile: (req, res) => {
        const { email } = req.body;
        getUserDetail(email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length === 0) {
                return res.json({
                    success: 0,
                    message: 'Record not Found',
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    updateProfilePicture: (req, res) => {
      const { email,profilePicture } = req.body;
          getUserDetail(email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length === 0) {
                return res.json({
                    success: 0,
                    message: 'Record not Found',
                });
            }
        
             userId = results[0].user_id;
        
             updateProfilePicture(userId, profilePicture,(err, results) => {
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
            },);
          });
    },
    uploadPicture: (req, res) => {
      const { email,postPicture } = req.body;
          getUserDetail(email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length === 0) {
                return res.json({
                    success: 0,
                    message: 'Record not Found',
                });
            }
        
             userId = results[0].user_id;
        
             uploadPicture(userId, postPicture,(err, results) => {
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
            },);
          });
    },
    getUploadedPictures: (req, res) => {
      const { email } = req.body;
      getUserDetail(email, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (results.length === 0) {
            return res.json({
                success: 0,
                message: 'Record not Found',
            });
        }
    
         userId = results[0].user_id;
    
         getUploadedPictures(userId,(err, results) => {
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
        },);
      });
    },
    getSearchResult: (req, res) => {
      // const { search } = req.body;
      const searchTerm = req.body.search || '';
      const params = [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}`,
        `${searchTerm}%`,
        `%${searchTerm}%`,
      ];
      getSearchResult(params,(err, results) => {
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
      },);
    },
    followUser: (req, res) => {
      const { email,followingEmail } = req.body;
          getUserDetail(email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length === 0) {
                return res.json({
                    success: 0,
                    message: 'Record not Found',
                });
            }
            
        
             userId = results[0].user_id;
             getUserDetail(followingEmail, (err, results) => {
              if (err) {
                  console.log(err);
                  return;
              }
              if (results.length === 0) {
                  return res.json({
                      success: 0,
                      message: 'Record not Found',
                  });
              }
              followingId = results[0].user_id;
        
             followUser(userId, followingId,(err, results) => {
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
                isFollowing: true,
              });
            },);
          });
    },
    );
  },
  unfollowUser: (req, res) => {
    const { email,followingEmail } = req.body;
        getUserDetail(email, (err, results) => {
          if (err) {
              console.log(err);
              return;
          }
          if (results.length === 0) {
              return res.json({
                  success: 0,
                  message: 'Record not Found',
              });
          }
            userId = results[0].user_id;
            getUserDetail(followingEmail, (err, results) => {
              if (err) {
                  console.log(err);
                  return;
              }
              if (results.length === 0) {
                  return res.json({
                      success: 0,
                      message: 'Record not Found',
                  });
              }
              followingId = results[0].user_id;
              unfollowUser(userId, followingId,(err, results) => {
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
                  isFollowing: false,
                });
              },);
            });
      },
      );
  },



  getFollowerStatus: (req, res) => {
    const { followerEmail,followingEmail } = req.body;
        getUserDetail(followerEmail, (err, results) => {
          if (err) {
              console.log(err);
              return;
          }
          if (results.length === 0) {
              return res.json({
                  success: 0,
                  message: 'Record not Found',
              });
          }
           userId = results[0].user_id;
           getUserDetail(followingEmail, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length === 0) {
                return res.json({
                    success: 0,
                    message: 'Record not Found',
                });
            }
            followingId = results[0].user_id;
      
           getFollowerStatus(userId, followingId,(err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: 'Database connection error',
              });
            }
          const count = results[0].count;
          const isFollowing = count > 0;
            return res.status(200).json({
              success: 1,
              followStatus: isFollowing,
            });
          },);
        });
  },
  );
},
  getUserDetails : (req, res) => {
    const { email } = req.body;
    getUserDetail(email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Database connection error',
        });
      }
      if (results.length === 0) {
        return res.json({
          success: 0,
          message: 'Record not Found',
        });
      }
  
      const userId = results[0].user_id;
  
      getFollowingCount(userId, (err, followingCount) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Database connection error',
          });
        }
  
        getFollowerCount(userId, (err, followerCount) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: 'Database connection error',
            });
          }
  
          getPostCount(userId, (err, postCount) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: 'Database connection error',
              });
            }
  
            return res.status(200).json({
              success: 1,
              data: {
                followingCount,
                followerCount,
                postCount,
              },
            });
          });
        });
      });
    });
  }
};

