const express = require("express");
const router = express.Router();
const {
    createFloor,
    editFloor,
    deleteFloor,
    getAllFloors
} = require('../controllers/floorController');

const auth = require("../middlewares/auth");

router.route('/admin/floor/create').post(auth, createFloor)
router.route('/admin/floor/update/:id').put(auth, editFloor)
router.route('/admin/floor/delete/:id').delete(auth, deleteFloor)
router.route('/floors/all').get(getAllFloors)


module.exports = router;