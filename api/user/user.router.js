const {
    createUser,checkEmail
} = require('./user.controller');
const router = require('express').Router();

router.post('/register', createUser);
router.post('/login', checkEmail);

module.exports = router;