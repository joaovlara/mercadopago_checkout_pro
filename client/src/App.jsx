import { useEffect, useState } from 'react'
import { Wallet } from '@mercadopago/sdk-react'

function App() {
  const [preferenceId, setPreferenceId] = useState(null)

  // Função para criar a preferência e pegar o preference_id
  const createPreference = async () => {
    try {
      const response = await fetch('http://localhost:5000/payment/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              title: 'Produto Exemplo',
              quantity: 1,
              unit_price: 100,
            },
          ],
        }),
      })

      const data = await response.json()
      setPreferenceId(data.id)
    } catch (error) {
      console.error('Erro ao criar preferência:', error)
    }
  }

  useEffect(() => {
    createPreference()
  }, [])

  if (!preferenceId) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      <h1>Pagamento Mercado Pago</h1>
      <Wallet preferenceId={preferenceId} />
    </div>
  )
}

export default App
