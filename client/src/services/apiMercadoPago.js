import { v4 as uuidv4 } from 'uuid';

const requestOptions = {
  'integratorId': '',
  };

export const handleIntegrationMP = async () => {
  const externalReference = uuidv4();

  const preferencia = {
    "items": [
      {
        "id": "1352",
        "title": "Produto Teste",
        "description": "Descrição",
        "picture_url": "https://www.myapp.com/myimage.jpg",
        "quantity": 1,
        "currency_id": "BRL",
        "unit_price": 10
      }
    ],
    "external_reference": externalReference 
  }

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'x-integrator-id': ''
      },
      body: JSON.stringify(preferencia)
    })

    const data = await response.json()

    return { init_point: data.init_point, external_reference: externalReference };

  } catch (error) {
    console.log(error)
  }
};

export const getPaymentIdByPreference = async (preferenceId) => {
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/search?external_reference=${preferenceId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'x-integrator-id': '',
      }
    });

    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].id;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const checkPaymentStatus = async (paymentId) => {
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'x-integrator-id': '',
      }
    });

    const data = await response.json();

    return data.status; 
  } catch (error) {
    console.error(error);
    return null;
  }
};
