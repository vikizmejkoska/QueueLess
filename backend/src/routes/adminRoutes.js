const express = require('express');
const router = express.Router();

const {
  getAdminDashboard,
  getAdminQueue,
  callNextTicket,
  updateTicketStatus,
} = require('../controllers/adminController');

const { protect } = require('../middlewares/authMiddleware');

router.get('/dashboard', protect, getAdminDashboard);
router.get('/queue', protect, getAdminQueue);
router.post('/queue/next', protect, callNextTicket);
router.put('/tickets/:id/status', protect, updateTicketStatus);

module.exports = router;