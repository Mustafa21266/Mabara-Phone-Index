const express = require("express");
const router = express.Router();
const {
    createExtension,
    editExtension,
    deleteExtension,
    getAllExtensions
} = require('../controllers/extensionController');

const auth = require("../middlewares/auth");

router.route('/admin/extension/create').post(auth, createExtension)
router.route('/admin/extension/update/:id').put(auth, editExtension)
router.route('/admin/extension/delete/:id').delete(auth, deleteExtension)
router.route('/extensions/all').get(getAllExtensions)


module.exports = router;