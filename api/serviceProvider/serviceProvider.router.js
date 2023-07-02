const{registerServiceProvider} = require('../serviceProvider/serviceProvider.controller');
const router = require('express').Router();

router.post('/registerServiceProvider', registerServiceProvider);
module.exports = router;