const express = require("express");
const router = express.Router();
const {
    createTableDay,
    editTableDay,
    deleteTableDay,
    getAllTableDays
} = require('../controllers/tabledayController');

const auth = require("../middlewares/auth");

router.route('/admin/tableday/create').post(auth, createTableDay)
router.route('/admin/tableday/update/:id').put(auth, editTableDay)
router.route('/admin/tableday/delete/:id').delete(auth, deleteTableDay)
router.route('/tabledays/all').get(getAllTableDays)


module.exports = router;