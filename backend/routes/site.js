const express = require("express");
const router = express.Router();
const {
    createSite,
    editSite,
    deleteSite,
    getAllSites
} = require('../controllers/siteController');

const auth = require("../middlewares/auth");

router.route('/admin/site/create').post(auth, createSite)
router.route('/admin/site/update/:id').put(auth, editSite)
router.route('/admin/site/delete/:id').delete(auth, deleteSite)
router.route('/sites/all').get(auth, getAllSites)


module.exports = router;