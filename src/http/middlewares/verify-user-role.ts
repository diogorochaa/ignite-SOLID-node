import { FastifyReply, FastifyRequest } from 'fastify'

// criando um middleware para verificar se o usuário está autenticado
export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    // verificando se o usuário tem a role necessária para acessar a rota
    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
