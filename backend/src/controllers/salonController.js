const prisma = require('../utils/prisma');

const getAllSalons = async (req, res) => {
  try {
    const salons = await prisma.salon.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(salons);
  } catch (error) {
    console.error('Error fetching salons:', error);
    res.status(500).json({ message: 'Failed to fetch salons.' });
  }
};

const getSalonById = async (req, res) => {
  try {
    const salonId = Number(req.params.id);

    if (isNaN(salonId)) {
      return res.status(400).json({ message: 'Invalid salon id.' });
    }

    const salon = await prisma.salon.findUnique({
      where: { id: salonId },
    });

    if (!salon) {
      return res.status(404).json({ message: 'Salon not found.' });
    }

    res.status(200).json(salon);
  } catch (error) {
    console.error('Error fetching salon:', error);
    res.status(500).json({ message: 'Failed to fetch salon.' });
  }
};

const getSalonServices = async (req, res) => {
  try {
    const salonId = Number(req.params.id);

    if (isNaN(salonId)) {
      return res.status(400).json({ message: 'Invalid salon id.' });
    }

    const salon = await prisma.salon.findUnique({
      where: { id: salonId },
    });

    if (!salon) {
      return res.status(404).json({ message: 'Salon not found.' });
    }

    const services = await prisma.service.findMany({
      where: {
        salonId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching salon services:', error);
    res.status(500).json({ message: 'Failed to fetch salon services.' });
  }
};

module.exports = {
  getAllSalons,
  getSalonById,
  getSalonServices,
};