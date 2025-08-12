import { getIronSession } from 'iron-session'

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: 'brydom-bank-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  },
}

export async function getSession(req, res) {
  return await getIronSession(req, res, sessionOptions)
}

export async function requireAuth(req, res) {
  const session = await getSession(req, res)
  
  if (!session.user) {
    return null
  }
  
  return session.user
}

export async function requireMestre(req, res) {
  const user = await requireAuth(req, res)
  
  if (!user || user.role !== 'mestre') {
    return null
  }
  
  return user
}

