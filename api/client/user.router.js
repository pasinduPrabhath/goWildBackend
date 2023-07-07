const {createClient,logInUser,checkExistingEmail,getUserDetailsForProfile,setProfilePicture} = require('./user.controller');

const router = require('express').Router();

router.post('/registerClient', createClient);
router.post('/login', logInUser);

router.post('/checkExistingEmail', checkExistingEmail);
router.post('/getUserDetailsForProfile', getUserDetailsForProfile);
router.post('/setClientProfilePicture', setProfilePicture);



module.exports = router;