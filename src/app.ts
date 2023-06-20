import fastify from 'fastify'

import { appRoutes } from './http/routes'

// criando uma instância do fastify
export const app = fastify()

app.register(appRoutes)
