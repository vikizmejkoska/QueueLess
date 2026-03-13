const express = require('express');
const router = express.Router();

const {
  getAllSalons,
  getSalonById,
  getSalonServices,
} = require('../controllers/salonController');

router.get('/', getAllSalons);
router.get('/:id', getSalonById);
router.get('/:id/services', getSalonServices);

module.exports = router;