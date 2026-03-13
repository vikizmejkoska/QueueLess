const prisma = require('../utils/prisma');

const getAdminDashboard = async (req, res) => {
  try {
    const salonId = req.user.salonId;

    const waitingCount = await prisma.ticket.count({
      where: {
        salonId,
        status: 'waiting',
      },
    });

    const inProgressTicket = await prisma.ticket.findFirst({
      where: {
        salonId,
        status: 'in_progress',
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const doneTodayCount = await prisma.ticket.count({
      where: {
        salonId,
        status: 'done',
      },
    });

    return res.status(200).json({
      waitingCount,
      inProgressTicket,
      doneTodayCount,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ message: 'Failed to fetch dashboard.' });
  }
};

const getAdminQueue = async (req, res) => {
  try {
    const salonId = req.user.salonId;

    const inProgressTicket = await prisma.ticket.findFirst({
      where: {
        salonId,
        status: 'in_progress',
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const waitingTickets = await prisma.ticket.findMany({
      where: {
        salonId,
        status: 'waiting',
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return res.status(200).json({
      inProgressTicket,
      waitingTickets,
    });
  } catch (error) {
    console.error('Queue error:', error);
    return res.status(500).json({ message: 'Failed to fetch queue.' });
  }
};

const callNextTicket = async (req, res) => {
  try {
    const salonId = req.user.salonId;

    const currentInProgress = await prisma.ticket.findFirst({
      where: {
        salonId,
        status: 'in_progress',
      },
    });

    if (currentInProgress) {
      return res.status(400).json({
        message: 'There is already a ticket in progress. Finish it first.',
      });
    }

    const nextWaitingTicket = await prisma.ticket.findFirst({
      where: {
        salonId,
        status: 'waiting',
      },
      include: {
        service: true,
        salon: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!nextWaitingTicket) {
      return res.status(404).json({ message: 'No waiting tickets in queue.' });
    }

    const updatedTicket = await prisma.ticket.update({
      where: {
        id: nextWaitingTicket.id,
      },
      data: {
        status: 'in_progress',
        startedAt: new Date(),
      },
      include: {
        service: true,
        salon: true,
      },
    });

    return res.status(200).json({
      message: 'Next ticket is now in progress.',
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error('Call next error:', error);
    return res.status(500).json({ message: 'Failed to call next ticket.' });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const salonId = req.user.salonId;
    const ticketId = Number(req.params.id);
    const { status } = req.body;

    if (isNaN(ticketId)) {
      return res.status(400).json({ message: 'Invalid ticket id.' });
    }

    const allowedStatuses = ['waiting', 'in_progress', 'done', 'cancelled'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!ticket || ticket.salonId !== salonId) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    if (status === 'in_progress') {
      const existingInProgress = await prisma.ticket.findFirst({
        where: {
          salonId,
          status: 'in_progress',
          NOT: {
            id: ticketId,
          },
        },
      });

      if (existingInProgress) {
        return res.status(400).json({
          message: 'Another ticket is already in progress.',
        });
      }
    }

    const updateData = {
      status,
    };

    if (status === 'in_progress') {
      updateData.startedAt = new Date();
      updateData.completedAt = null;
    }

    if (status === 'done') {
      updateData.completedAt = new Date();
    }

    if (status === 'cancelled') {
      updateData.completedAt = null;
    }

    if (status === 'waiting') {
      updateData.startedAt = null;
      updateData.completedAt = null;
    }

    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: updateData,
      include: {
        service: true,
        salon: true,
      },
    });

    return res.status(200).json({
      message: 'Ticket status updated successfully.',
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error('Update ticket status error:', error);
    return res.status(500).json({ message: 'Failed to update ticket status.' });
  }
};

module.exports = {
  getAdminDashboard,
  getAdminQueue,
  callNextTicket,
  updateTicketStatus,
};