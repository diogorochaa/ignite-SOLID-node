import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticate.controller'
import { profileController } from './profile.controller'
import { registerController } from './register.controller'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  // Não autenticado
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  // Refresh token
  app.patch('/token/refresh', refresh)

  // Autenticado
  app.get('/me', { onRequest: [verifyJwt] }, profileController)
}
