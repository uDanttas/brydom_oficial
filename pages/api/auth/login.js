import { getIronSession } from 'iron-session'

const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: 'brydom-bank-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  const { senha } = req.body

  if (!senha) {
    return res.status(400).json({ message: 'Senha é obrigatória' })
  }

  const session = await getIronSession(req, res, sessionOptions)

  // Verificar se é senha do mestre
  if (senha === process.env.MESTRE_SENHA) {
    session.user = {
      id: 'mestre',
      role: 'mestre',
      name: 'Administrador'
    }
    await session.save()
    return res.status(200).json({ 
      success: true, 
      role: 'mestre',
      message: 'Login realizado com sucesso' 
    })
  }

  // Aqui você pode adicionar lógica para verificar senhas de clientes
  // Por enquanto, vamos aceitar qualquer senha que não seja do mestre como cliente
  if (senha.length >= 4) {
    session.user = {
      id: `cliente_${Date.now()}`,
      role: 'cliente',
      name: 'Cliente'
    }
    await session.save()
    return res.status(200).json({ 
      success: true, 
      role: 'cliente',
      message: 'Login realizado com sucesso' 
    })
  }

  return res.status(401).json({ message: 'Senha inválida' })
}

