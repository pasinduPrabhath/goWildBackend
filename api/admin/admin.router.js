const{getTotalUsers,getServiceProvider,approveServiceProvider,deleteTheDeclinedEntry} = require('./admin.controller');
const router = require('express').Router();

router.get('/totalUsers', getTotalUsers);
router.get('/getServiceProvider', getServiceProvider);
router.post('/approveServiceProvider', approveServiceProvider);
router.post('/deleteDeclinedEntry', deleteTheDeclinedEntry);
module.exports = router;