import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function testar() {
  const usuarios = await prisma.usuario.findMany()
  console.log(usuarios)
}

testar().finally(() => prisma.$disconnect())
