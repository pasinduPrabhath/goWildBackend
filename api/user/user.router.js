const {
    createUser,checkEmail,getTotalUsers
} = require('./user.controller');
const router = require('express').Router();

router.post('/register', createUser);
router.post('/login', checkEmail);
router.get('/totalUsers', getTotalUsers);

module.exports = router;