const express = require("express");
const router = express.Router();
const { 
    createTicketHTML,
    getAllTicketHTMLs,
    addTicketHTMLImage,
    deleteTicketHTMLImage,
    editTicketHTML,
    deleteTicketHTML,
    searchTicketHTMLs
} = require('../controllers/ticketHTMLController');

const fileUpload = require('express-fileupload');


const auth = require("../middlewares/auth");

router.route('/admin/ticketHTML/create').post(auth, createTicketHTML)
router.route('/admin/ticketHTML/update/:id').put(auth, editTicketHTML)
router.route('/admin/ticketHTML/delete/:id').delete(auth, deleteTicketHTML)
router.route('/admin/ticketHTML/images/upload/:id').post(auth, addTicketHTMLImage)
router.route('/admin/ticketHTML/images/delete/:id').post(auth, deleteTicketHTMLImage)
router.route('/ticketHTMLs/all').get(getAllTicketHTMLs)
router.route('/ticketHTMLs/search').get(searchTicketHTMLs)


module.exports = router;