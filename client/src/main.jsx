import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initMercadoPago } from '@mercadopago/sdk-react'
initMercadoPago('TEST-60606327-601b-44af-8740-dd77ef0bd030');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
