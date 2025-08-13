export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  try {
    const { limit = 10 } = req.query

    // Simular operações recentes
    const operations = []
    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'SOLUSDT']
    const types = ['COMPRA', 'VENDA']

    for (let i = 0; i < parseInt(limit); i++) {
      const operation = {
        id: `op_${Date.now()}_${i}`,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        type: types[Math.floor(Math.random() * types.length)],
        amount: (Math.random() * 1000) + 100,
        price: (Math.random() * 50000) + 30000,
        profit: (Math.random() * 5) + 5,
        confidence: 99.999 - (Math.random() * 0.001),
        status: 'completed',
        executedAt: new Date(Date.now() - (i * 10000)).toISOString() // Operações a cada 10 segundos
      }
      operations.push(operation)
    }

    res.status(200).json({ operations })
  } catch (error) {
    console.error('Erro ao obter operações recentes:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

