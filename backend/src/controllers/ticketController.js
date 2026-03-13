const {
  createTicketService,
  getTicketByIdService,
  getTicketStatusService,
} = require('../services/ticketService');

const createTicket = async (req, res) => {
  try {
    const { customerName, customerPhone, salonId, serviceId } = req.body;

    if (!customerName || !customerPhone || !salonId || !serviceId) {
      return res.status(400).json({
        message: 'customerName, customerPhone, salonId and serviceId are required.',
      });
    }

    const newTicket = await createTicketService({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      salonId: Number(salonId),
      serviceId: Number(serviceId),
    });

    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);

    const knownMessages = [
      'Salon not found.',
      'Service not found.',
      'Selected service does not belong to the selected salon.',
      'Selected service is not active.',
    ];

    if (knownMessages.includes(error.message)) {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Ticket number conflict. Please try again.' });
    }

    res.status(500).json({ message: 'Failed to create ticket.' });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = Number(req.params.id);

    if (isNaN(ticketId)) {
      return res.status(400).json({ message: 'Invalid ticket id.' });
    }

    const ticket = await getTicketByIdService(ticketId);
    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);

    if (error.message === 'Ticket not found.') {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: 'Failed to fetch ticket.' });
  }
};

const getTicketStatus = async (req, res) => {
  try {
    const ticketId = Number(req.params.id);

    if (isNaN(ticketId)) {
      return res.status(400).json({ message: 'Invalid ticket id.' });
    }

    const ticketStatus = await getTicketStatusService(ticketId);
    res.status(200).json(ticketStatus);
  } catch (error) {
    console.error('Error fetching ticket status:', error);

    if (error.message === 'Ticket not found.') {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: 'Failed to fetch ticket status.' });
  }
};

module.exports = {
  createTicket,
  getTicketById,
  getTicketStatus,
};