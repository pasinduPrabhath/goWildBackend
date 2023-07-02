const {
    createClient,logInUser,checkExistingEmail,registerServiceProvider} = require('./user.controller');
const{getTotalUsers,getServiceProvider,approveServiceProvider} = require('../admin/admin.controller');
const router = require('express').Router();

router.post('/registerClient', createClient);
router.post('/login', logInUser);
router.get('/totalUsers', getTotalUsers);
router.post('/checkExistingEmail', checkExistingEmail);
router.post('/registerServiceProvider', registerServiceProvider);
router.get('/getServiceProvider', getServiceProvider);
router.post('/approveServiceProvider', approveServiceProvider);

module.exports = router;//