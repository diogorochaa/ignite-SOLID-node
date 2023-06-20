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

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    return reply.status(500).send()
  }

  // retornando o status 201
  return reply.status(201).send()
}
