import { Prisma, User } from '@prisma/client'

// criando uma interface para o repositório de usuários
export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
