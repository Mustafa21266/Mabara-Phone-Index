const express = require("express");
const router = express.Router();
const { 
    createTicket,
    getAllTickets,
    addTicketImage,
    deleteTicketImage,
    editTicket,
    deleteTicket,
    searchTickets
} = require('../controllers/ticketController');

const fileUpload = require('express-fileupload');


const auth = require("../middlewares/auth");

router.route('/admin/ticket/create').post(auth, createTicket)
router.route('/admin/ticket/update/:id').put(auth, fileUpload, editTicket)
router.route('/admin/ticket/delete/:id').delete(auth, deleteTicket)
router.route('/admin/ticket/images/upload/:id').post(auth, addTicketImage)
router.route('/admin/ticket/images/delete/:id').post(auth, deleteTicketImage)
router.route('/tickets/all').get(getAllTickets)
router.route('/tickets/search').get(searchTickets)


module.exports = router;