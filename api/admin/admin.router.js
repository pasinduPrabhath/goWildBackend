const{getTotalUsers,getServiceProvider,approveServiceProvider,deleteTheDeclinedEntry,getTotalServiceProviders} = require('./admin.controller');
const router = require('express').Router();

router.get('/totalUsers', getTotalUsers);
router.get('/getServiceProvider', getServiceProvider);
router.get('/getTotalServiceProviders', getTotalServiceProviders);
router.post('/approveServiceProvider', approveServiceProvider);
router.post('/deleteDeclinedEntry', deleteTheDeclinedEntry);
module.exports = router;s