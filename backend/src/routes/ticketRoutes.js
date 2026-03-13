const express = require('express');
const router = express.Router();

const {
  createTicket,
  getTicketById,
  getTicketStatus,
} = require('../controllers/ticketController');

router.post('/', createTicket);
router.get('/:id', getTicketById);
router.get('/:id/status', getTicketStatus);

module.exports = router;