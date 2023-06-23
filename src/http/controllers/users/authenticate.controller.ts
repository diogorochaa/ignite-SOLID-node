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

    const { user } = await authenticateUseCase.execute({ email, password })

    // gerando um token JWT
    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )
    // gerando um token JWT para o refresh token
    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    // retornando o token JWT e o refresh token
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    // verificando se o erro é de usuário já existente
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
