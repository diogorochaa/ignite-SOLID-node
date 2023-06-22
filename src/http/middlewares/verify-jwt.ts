import { FastifyReply, FastifyRequest } from 'fastify'

// criando um middleware para verificar se o usuário está autenticado
export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
