const {create, checkLoginEmail} = require('./user.service');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
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
        const body = req.body;
        checkLoginEmail(body, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
}