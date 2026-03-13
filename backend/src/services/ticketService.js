const prisma = require('../utils/prisma');
const generateTicketNumber = require('../utils/generateTicketNumber');

const createTicketService = async ({ customerName, customerPhone, salonId, serviceId }) => {
  const salon = await prisma.salon.findUnique({
    where: { id: salonId },
  });

  if (!salon) {
    throw new Error('Salon not found.');
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    throw new Error('Service not found.');
  }

  if (service.salonId !== salonId) {
    throw new Error('Selected service does not belong to the selected salon.');
  }

  if (!service.isActive) {
    throw new Error('Selected service is not active.');
  }

  const allTicketsCount = await prisma.ticket.count();
  const ticketNumber = generateTicketNumber(allTicketsCount + 1);

  const currentInProgress = await prisma.ticket.findFirst({
    where: {
      salonId,
      status: 'in_progress',
    },
    include: {
      service: true,
    },
  });

  const waitingTicketsAhead = await prisma.ticket.findMany({
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

  let peopleAhead = waitingTicketsAhead.length;
  let estimatedWaitMinutes = waitingTicketsAhead.reduce((sum, ticket) => {
    return sum + ticket.service.durationMinutes;
  }, 0);

  if (currentInProgress?.service) {
    peopleAhead += 1;
    estimatedWaitMinutes += currentInProgress.service.durationMinutes;
  }

  const createdTicket = await prisma.ticket.create({
    data: {
      ticketNumber,
      customerName,
      customerPhone,
      salonId,
      serviceId,
      status: 'waiting',
      estimatedWaitMinutes,
    },
    include: {
      salon: true,
      service: true,
    },
  });

  return {
    id: createdTicket.id,
    ticketNumber: createdTicket.ticketNumber,
    status: createdTicket.status,
    customerName: createdTicket.customerName,
    customerPhone: createdTicket.customerPhone,
    salonId: createdTicket.salonId,
    salonName: createdTicket.salon.name,
    serviceId: createdTicket.serviceId,
    serviceName: createdTicket.service.name,
    peopleAhead,
    estimatedWaitMinutes: createdTicket.estimatedWaitMinutes,
    createdAt: createdTicket.createdAt,
  };
};

const getTicketByIdService = async (ticketId) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      salon: true,
      service: true,
    },
  });

  if (!ticket) {
    throw new Error('Ticket not found.');
  }

  return ticket;
};

const getTicketStatusService = async (ticketId) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      salon: true,
      service: true,
    },
  });

  if (!ticket) {
    throw new Error('Ticket not found.');
  }

  let peopleAhead = 0;
  let estimatedWaitMinutes = 0;
  let statusText = 'Unknown status';

  if (ticket.status === 'waiting') {
    const currentInProgress = await prisma.ticket.findFirst({
      where: {
        salonId: ticket.salonId,
        status: 'in_progress',
      },
      include: {
        service: true,
      },
    });

    const waitingTicketsAhead = await prisma.ticket.findMany({
      where: {
        salonId: ticket.salonId,
        status: 'waiting',
        createdAt: {
          lt: ticket.createdAt,
        },
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    peopleAhead = waitingTicketsAhead.length;
    estimatedWaitMinutes = waitingTicketsAhead.reduce((sum, item) => {
      return sum + item.service.durationMinutes;
    }, 0);

    if (currentInProgress?.service) {
      peopleAhead += 1;
      estimatedWaitMinutes += currentInProgress.service.durationMinutes;
    }

    if (peopleAhead === 0) {
      statusText = 'Your turn soon';
    } else if (peopleAhead === 1) {
      statusText = '1 person ahead';
    } else {
      statusText = `${peopleAhead} people ahead`;
    }
  }

  if (ticket.status === 'in_progress') {
    statusText = 'Now serving';
  }

  if (ticket.status === 'done') {
    statusText = 'Service completed';
  }

  if (ticket.status === 'cancelled') {
    statusText = 'Ticket cancelled';
  }

  return {
    ticketId: ticket.id,
    ticketNumber: ticket.ticketNumber,
    status: ticket.status,
    statusText,
    peopleAhead,
    estimatedWaitMinutes,
    salonName: ticket.salon.name,
    serviceName: ticket.service.name,
    customerName: ticket.customerName,
    createdAt: ticket.createdAt,
  };
};

module.exports = {
  createTicketService,
  getTicketByIdService,
  getTicketStatusService,
};