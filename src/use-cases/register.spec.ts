import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase
// criando um caso de uso para o registro de usuários
describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  // criando um teste para verificar se a senha do usuário é criptografada
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const isPasswordHashValid = await compare('12345678', user.password_hash)

    expect(isPasswordHashValid).toBe(true)
  })

  // criando um teste para verificar se o e-mail do usuário já existe
  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
