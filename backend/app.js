import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import dotenv from 'dotenv'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});
const payment = new Payment(client);

app.post('/api/create-payment', (req, res) => {
  const { transaction_amount, description, payment_method_id, email } = req.body;

  const body = {
    transaction_amount,
    description,
    payment_method_id,
    payer: { email }
  };

  payment.create({ body })
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});