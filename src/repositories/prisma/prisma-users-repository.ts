import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

// criando uma classe para o repositório de usuários
export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    // procurando um usuário pelo email no banco de dados
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    // retornando o usuário encontrado
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    // criando um usuário no banco de dados
    const user = await prisma.user.create({
      data,
    })

    // retornando o usuário criado
    return user
  }
}
