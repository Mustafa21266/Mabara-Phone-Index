const express = require("express");
const router = express.Router();
const { 
    createPC,
    getAllPCs,
    editPC,
    deletePC,
    searchPCs,
} = require('../controllers/pcController');

const auth = require("../middlewares/auth");

router.route('/admin/pc/create').post(auth, createPC)
router.route('/admin/pc/update/:id').put(auth, editPC)
router.route('/admin/pc/delete/:id').delete(auth, deletePC)
router.route('/pcs/all').get(getAllPCs)
router.route('/pcs/search').get(searchPCs)

module.exports = router;