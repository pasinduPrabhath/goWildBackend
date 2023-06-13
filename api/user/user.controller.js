const {create, checkLoginEmail,getNumberOfUsers} = require('./user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const { firstName, lastName,birthday,country,town,mobileNumber,gender,email, password, nicNumber,sp, userRole} = req.body;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        const body = { firstName, email, password: encryptedPassword, lastName,birthday,country,town,mobileNumber,gender,email,nicNumber,sp, userRole};
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    checkEmail: (req, res) => {
        const { email, password } = req.body;
        checkLoginEmail({ email }, (err, results) => {
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
            role: user.userRole,
            token,
        });
});
    },
    getTotalUsers: (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: 0,
                message: 'Invalid token',
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
        }
        );
    });
},
generateToken(user) {
    const payload = {
        userId: user.id,
        email: user.email,
        userRole: user.userRole
    };
    const secret = 'your_secret_key';
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, secret, options);
}};