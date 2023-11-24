const { CreateUser } = require('../src/services/CreateUser');
const { PrismaUsersRepository } = require('../src/repositories/prisma/PrismaUsersRepository');

jest.mock('../src/repositories/prisma/PrismaUsersRepository');

describe('CreateUser Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const createUser = new CreateUser(mockUserRepository);

    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    };

    await createUser.execute(userData);

    expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
  });

  it('should throw an error if required fields are missing', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const createUser = new CreateUser(mockUserRepository);

    const userData = {
    };

    await expect(createUser.execute(userData)).rejects.toThrow('Fields are required');
  });
});
