import { Prisma, User } from '@prisma/client'

// criando uma classe para o repositório de usuários em memória
export class InMemoryUsersRepository {
  public items: User[] = []

  // criando um método para buscar um usuário pelo e-mail
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  // criando um método para criar um usuário
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(user)
    return user
  }
}
