const{getNumberOfUsers} = require('./admin.service.js');
const secret = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

module.exports = {

getTotalUsers: (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: 0,
                message: 'Invalid token'
            });
        }
    getNumberOfUsers(null,(err, results) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error",
            });
        }
        return res.status(200).json({
            userCount: results[0].numberOfUsers,
        });
    });
});
},};