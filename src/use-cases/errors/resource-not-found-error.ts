// criando uma classe para o erro de recurso não encontrado
export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found.')
  }
}
