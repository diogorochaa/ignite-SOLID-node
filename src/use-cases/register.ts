import { UsersRepository } from '@/repositories/users-repository'

import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

// criando uma interface para o request do use case
interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// criando uma classe para o use case
export class RegisterUseCase {
  // recebendo o repositório de usuários como dependência
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    // criando um hash da senha do usuário
    const password_hash = await hash(password, 6)

    // procurando um usuário pelo email no banco de dados
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    // verificando se já existe um usuário com o email informado
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // criando um usuário no banco de dados
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

// o use case é uma camada que não sabe nada sobre o que está acontecendo fora dela, ela apenas executa uma ação e retorna um resultado, sem se preocupar com o que está acontecendo fora dela.
