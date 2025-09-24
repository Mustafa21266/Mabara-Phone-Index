const express = require("express");
const router = express.Router();
const {
    createPin,
    deletePin,
    getAllPins
} = require('../controllers/pinController');

const auth = require("../middlewares/auth");

router.route('/admin/pin/create').post(auth, createPin)
router.route('/admin/pin/delete/:id').delete(auth, deletePin)
router.route('/pins/all').get(auth, getAllPins)


module.exports = router;