const {createClient,logInUser,checkExistingEmail,getUserDetailsForProfile,updateProfilePicture,uploadPicture,getUploadedPictures,getSearchResult} = require('./user.controller');

const router = require('express').Router();

router.post('/registerClient', createClient);
router.post('/login', logInUser);

router.post('/checkExistingEmail', checkExistingEmail);
router.post('/getUserDetailsForProfile', getUserDetailsForProfile);
router.post('/updateProfilePicture', updateProfilePicture);
router.post('/uploadPicture', uploadPicture);
router.post('/getUploadedPictures', getUploadedPictures);
router.post('/getSearchResult', getSearchResult);

module.exports = router;