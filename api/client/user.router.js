const {createClient,logInUser,checkExistingEmail,getUserDetailsForProfile,updateProfilePicture,uploadPicture,getUploadedPictures,getSearchResult,followUser,unfollowUser,getFollowerStatus,getFollowingCount,getFollowerCount,getPostCount,getUserDetails} = require('./user.controller');

const router = require('express').Router();

router.post('/registerClient', createClient);
router.post('/login', logInUser);

router.post('/checkExistingEmail', checkExistingEmail);
router.post('/getUserDetailsForProfile', getUserDetailsForProfile);
router.post('/updateProfilePicture', updateProfilePicture);
router.post('/uploadPicture', uploadPicture);
router.post('/getUploadedPictures', getUploadedPictures);
router.post('/getSearchResult', getSearchResult);
router.post('/followUser', followUser);
router.post('/unfollowUser', unfollowUser);
router.post('/getFollowerStatus', getFollowerStatus);
router.post('/getUserDetails', getUserDetails);

module.exports = router;