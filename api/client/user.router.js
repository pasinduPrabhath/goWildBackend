const {createClient,logInUser,checkExistingEmail} = require('./user.controller');

const{registerServiceProvider} = require('../serviceProvider/serviceProvider.controller');
const router = require('express').Router();

router.post('/registerClient', createClient);
router.post('/login', logInUser);

router.post('/checkExistingEmail', checkExistingEmail);
router.post('/registerServiceProvider', registerServiceProvider);


module.exports = router;//