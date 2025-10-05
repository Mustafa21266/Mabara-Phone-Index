const express = require("express");
const router = express.Router();
const {
    adduserUser,
    loginUser,
    logoutUser,
    editUserDetails,
    getUserDetails, 
    forgotPassword, 
    resetPassword,
} = require('../controllers/userController');

const auth = require("../middlewares/auth");

router.route('/adduser').post(adduserUser)
router.route('/login').post(loginUser)
router.route('/logout/:token').get(auth, logoutUser)
router.route('/getUserDetails/:token').get(auth, getUserDetails)
router.route('/me/update/:id').put(auth, editUserDetails)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)








module.exports = router;