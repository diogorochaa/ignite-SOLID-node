import { env } from '@/environments'
import { PrismaClient } from '@prisma/client'

// criando uma instância do prisma e adicionando o log de querys
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
