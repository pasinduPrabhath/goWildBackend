const {createClient,logInUser,checkExistingEmail,getUserDetailsForProfile,updateProfilePicture} = require('./user.controller');

const router = require('express').Router();

router.post('/registerClient', createClient);
router.post('/login', logInUser);

router.post('/checkExistingEmail', checkExistingEmail);
router.post('/getUserDetailsForProfile', getUserDetailsForProfile);
router.post('/updateProfilePicture', updateProfilePicture);




module.exports = router;