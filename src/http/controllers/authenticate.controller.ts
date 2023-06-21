import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

// criando um controller para o registro de usuários
export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // criando um schema para validar o corpo da requisição
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  // validando o corpo da requisição
  const { email, password } = authenticateBodySchema.parse(request.body)

  // criando uma instância do use case de registro de usuários
  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    // verificando se o erro é de usuário já existente
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

  // retornando o status 201
  return reply.status(200).send()
}
