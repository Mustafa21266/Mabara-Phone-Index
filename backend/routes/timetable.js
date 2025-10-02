const express = require("express");
const router = express.Router();
const {
    createTimeTable,
    editTimeTable,
    deleteTimeTable,
    getAllTimeTables
} = require('../controllers/timetableController');

const auth = require("../middlewares/auth");

router.route('/admin/timetable/create').post(auth, createTimeTable)
router.route('/admin/timetable/update/:id').put(auth, editTimeTable)
router.route('/admin/timetable/delete/:id').delete(auth, deleteTimeTable)
router.route('/timetables/all').get(getAllTimeTables)


module.exports = router;