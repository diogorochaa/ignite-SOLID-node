import fastify from 'fastify'

import { ZodError } from 'zod'
import { env } from './environments'
import fastifyJwt = require('@fastify/jwt')
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'

// criando uma instância do fastify
export const app = fastify()

// registrando o plugin de autenticação
app.register(fastifyJwt, { secret: env.JWT_SECRET })

// registrando as rotas
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

// registrando o handler de erros
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  reply.status(500).send({ message: 'Internal server error' })
})
