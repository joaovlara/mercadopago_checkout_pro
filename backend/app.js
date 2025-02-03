require('dotenv').config();

const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(express.json());

app.use('/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});