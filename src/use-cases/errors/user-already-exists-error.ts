// criar classe de erro para usuário já existente
export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
