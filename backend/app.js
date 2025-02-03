const express = require("express");
const app = express();
const cors = require("cors");
const { MercadoPagoConfig, Payment } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: "<ACCESS_TOKEN>",
  options: { timeout: 5000, idempotencyKey: "abc" }
});

const payment = new Payment(client);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("../../client/html-js"));
app.use(cors());

// Rota inicial para servir o arquivo index.html
app.get("/", function (req, res) {
  res.status(200).sendFile("index.html");
});

app.post("/create_preference", (req, res) => {
  const body = {
    transaction_amount: Number(req.body.price) * Number(req.body.quantity),
    description: req.body.description, 
    payment_method_id: req.body.payment_method_id,
    payer: {
      email: req.body.email 
    }
  };

  const requestOptions = {
    idempotencyKey: req.body.idempotencyKey || 'default-idempotency-key', // Chave de idempotência
  };

  payment.create({ body, requestOptions })
    .then(response => {
      res.json({
        id: response.body.id
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar pagamento" });
    });
});

app.get('/feedback', function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  });
});

app.listen(8080, () => {
  console.log("O servidor está rodando na porta 8080");
});