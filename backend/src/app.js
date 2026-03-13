const express = require('express');
const cors = require('cors');

const salonRoutes = require('./routes/salonRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'QueueLess API is running' });
});

app.use('/salons', salonRoutes);
app.use('/tickets', ticketRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

module.exports = app;