import { getIronSession } from 'iron-session'

const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: 'brydom-bank-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  try {
    const session = await getIronSession(req, res, sessionOptions)

    if (!session.user) {
      return res.status(401).json({ message: 'Não autorizado' })
    }

    // Simular saldo do usuário (em produção, viria do banco de dados)
    const userBalance = {
      available: 15420.75 + (Math.random() * 100), // Simular crescimento
      todayProfit: (Math.random() * 500) + 200,
      totalProfit: (Math.random() * 10000) + 5000,
      activeBots: 3,
      precision: 99.999 - (Math.random() * 0.001)
    }

    res.status(200).json(userBalance)
  } catch (error) {
    console.error('Erro ao obter saldo do usuário:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

