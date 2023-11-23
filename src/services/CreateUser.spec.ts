import { InMemoryUsers } from "../../test/repositories/inMemoryUsers"
import { CreateUser } from "./CreateUser"

describe('CreateUser service', () => {

  it('should be able to create a new user', async () => {
    const inMemoryUsers = new InMemoryUsers();
    const createUser = new CreateUser(inMemoryUsers);

    await expect(createUser.execute({
      name: 'Roberto',
      email: 'roberto@email.com',
      password: '123456'
    })).resolves.not.toThrow();

    expect(inMemoryUsers.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'roberto@email.com'
        })
      ])
    )
  })

  it('should NOT be able to create a new user with no name', async () => {
    const inMemoryUsers = new InMemoryUsers();
    const createUser = new CreateUser(inMemoryUsers);

    await expect(createUser.execute({
      name: '',
      email: 'roberto@email.com',
      password: '123456'
    })).rejects.toThrow();

    expect(inMemoryUsers.items).toEqual([])
  })

  it('should NOT be able to create a new user with no email', async () => {
    const inMemoryUsers = new InMemoryUsers();
    const createUser = new CreateUser(inMemoryUsers);

    await expect(createUser.execute({
      name: 'Roberto',
      email: '',
      password: '123456'
    })).rejects.toThrow();

    expect(inMemoryUsers.items).toEqual([])
  })

  it('should NOT be able to create a new user with no password', async () => {
    const inMemoryUsers = new InMemoryUsers();
    const createUser = new CreateUser(inMemoryUsers);

    await expect(createUser.execute({
      name: 'Roberto',
      email: 'roberto@email.com',
      password: ''
    })).rejects.toThrow();

    expect(inMemoryUsers.items).toEqual([])
  })
})
