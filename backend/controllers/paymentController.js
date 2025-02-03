const mercadopago = require('mercadopago');

const createPreference = async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: 'Produto Teste',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 25.0,
        },
      ],
      back_urls: {
        success: 'https://www.seusite.com/success',
        failure: 'https://www.seusite.com/failure',
        pending: 'https://www.seusite.com/pending',
      },
      auto_return: 'approved',
    };

    const preferenceResponse = await mercadopago.preferences.create(preference);

    res.status(200).json({
      init_point: preferenceResponse.body.sandbox_init_point,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a preferência de pagamento' });
  }
};

module.exports = { createPreference };
