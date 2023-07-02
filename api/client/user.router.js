const {createClient,logInUser,checkExistingEmail} = require('./user.controller');

const router = require('express').Router();

router.post('/registerClient', createClient);
router.post('/login', logInUser);

router.post('/checkExistingEmail', checkExistingEmail);



module.exports = router;