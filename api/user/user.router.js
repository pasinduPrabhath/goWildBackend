const {
    createUser,checkEmail,getTotalUsers,checkExistingEmail,registerServiceProvider
} = require('./user.controller');
const router = require('express').Router();

router.post('/register', createUser);
router.post('/login', checkEmail);
router.get('/totalUsers', getTotalUsers);
router.post('/checkExistingEmail', checkExistingEmail);
router.post('/registerServiceProvider', registerServiceProvider);

module.exports = router;//