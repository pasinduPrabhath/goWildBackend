const {
    createUser,checkEmail
} = require('./user.controller');
const router = require('express').Router();

router.post('/register', createUser);
router.get('/login', checkEmail);

module.exports = router;