const {
    createClient,logInUser,getTotalUsers,checkExistingEmail,registerServiceProvider,getServiceProvider
} = require('./user.controller');
const router = require('express').Router();

router.post('/registerClient', createClient);
router.post('/login', logInUser);
router.get('/totalUsers', getTotalUsers);
router.post('/checkExistingEmail', checkExistingEmail);
router.post('/registerServiceProvider', registerServiceProvider);
router.get('/getServiceProvider', getServiceProvider);

module.exports = router;//