const{getTotalUsers,getServiceProvider,approveServiceProvider} = require('./admin.controller');
const router = require('express').Router();

router.get('/totalUsers', getTotalUsers);
router.get('/getServiceProvider', getServiceProvider);
router.post('/approveServiceProvider', approveServiceProvider);
module.exports = router;