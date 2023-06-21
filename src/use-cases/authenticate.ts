import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

// criando um caso de uso para a autenticação de usuários
export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  // criando um método para executar o caso de uso
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    // verificando se o usuário existe
    if (!user) {
      throw new InvalidCredentialsError()
    }

    // verificando se a senha do usuário está correta
    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    // retornando o usuário
    return {
      user,
    }
  }
}
