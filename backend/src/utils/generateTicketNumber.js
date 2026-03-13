function generateTicketNumber(count) {
  return `A-${String(count).padStart(3, '0')}`;
}

module.exports = generateTicketNumber;