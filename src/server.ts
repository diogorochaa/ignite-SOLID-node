import { app } from './app'
import { env } from './environments'

// iniciando o servidor fastify
app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 Server started on port 3333!')
  })
