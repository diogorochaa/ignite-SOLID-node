import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

// criando um controller para o registro de usuários
export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // criando um schema para validar o corpo da requisição
  const registerBodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8),
  })
  // validando o corpo da requisição
  const { name, email, password } = registerBodySchema.parse(request.body)

  // criando uma instância do use case de registro de usuários
  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    // verificando se o erro é de usuário já existente
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  // retornando o status 201
  return reply.status(201).send()
}
