import { v4 as uuidv4 } from 'uuid';
import { ACCESS_TOKEN, INTEGRATOR_ID } from '../../@env';


export const handleIntegrationMP = async () => {
  const externalReference = 'joaovdelara@gmail.com';

  const preferencia = {
   "items": [
    {
      "id": "1352",
      "title": "Pessoas Normais - Sally Rooney",
      "description": "Livro de Romance",
      "picture_url": "~/assets/normalPeopleBook.jpg",
      "quantity": 1,
      "currency_id": "BRL",
      "unit_price": 50
    }
  ],
  "payment_methods": {
    "excluded_payment_methods": [
      {
        "id": "visa"
      }
    ],
    "installments": 6,
  },
  "back_urls": {
    "success": "https://test.com/success",
    "pending": "https://test.com/pending",
    "failure": "https://test.com/failure"
  },
  "notification_url": "https://notificationurl.com",
  "external_reference": externalReference
  };

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'x-integrator-id': INTEGRATOR_ID
      },
      body: JSON.stringify(preferencia)
    });

    const data = await response.json();

    return { init_point: data.init_point, external_reference: externalReference };
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentIdByPreference = async (preferenceId) => {
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/search?external_reference=${preferenceId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'x-integrator-id': INTEGRATOR_ID,
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
        'x-integrator-id': INTEGRATOR_ID,
      }
    });

    const data = await response.json();

    return data.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};
