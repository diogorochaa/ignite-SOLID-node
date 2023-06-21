// criar classe de erro para usuário já existente
export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}
