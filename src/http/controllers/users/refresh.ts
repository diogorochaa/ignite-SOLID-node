import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // verifica se o usuário está autenticado
  await request.jwtVerify({ onlyCookie: true })

  // gera um novo token JWT
  const { role } = request.user

  // gerando um token JWT
  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  // gerando um token JWT para o refresh token
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
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
}
