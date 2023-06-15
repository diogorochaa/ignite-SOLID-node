import 'dotenv/config'
import { z } from 'zod'

// Definindo o schema de validação das variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
})
// Validando as variáveis de ambiente
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(
    'Erro ao validar as variáveis de ambiente:',
    _env.error.format(),
  )
  // Encerrando a aplicação
  throw new Error('Erro ao validar as variáveis de ambiente')
}
// Exportando as variáveis de ambiente
export const env = _env.data
