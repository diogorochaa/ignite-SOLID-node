import { FastifyInstance } from 'fastify'
import request from 'supertest'

// função para criar e autenticar usuário nos testes
export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '12345678',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '12345678',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
