const express = require("express");
const router = express.Router();
const {
    createDepartment,
    editDepartment,
    deleteDepartment,
    getAllDepartments
} = require('../controllers/departmentController');

const auth = require("../middlewares/auth");

router.route('/admin/department/create').post(auth, createDepartment)
router.route('/admin/department/update/:id').put(auth, editDepartment)
router.route('/admin/department/delete/:id').delete(auth, deleteDepartment)
router.route('/departments/all').get(getAllDepartments)


module.exports = router;