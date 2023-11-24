const { ListAllUsers } = require('../src/services/ListAllUsers');
const { PrismaUsersRepository } = require('../src/repositories/prisma/PrismaUsersRepository');

jest.mock('../src/repositories/prisma/PrismaUsersRepository');

describe('ListAllUsers Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of users', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const listAllUsers = new ListAllUsers(mockUserRepository);

    const mockUsers = [
      { id: 1, email: 'test1@example.com', name: 'Test User 1', password: 'password123' },
      { id: 2, email: 'test2@example.com', name: 'Test User 2', password: 'password456' },
    ];

    mockUserRepository.getAll.mockResolvedValueOnce(mockUsers);

    const result = await listAllUsers.execute();

    expect(mockUserRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  it('should handle repository error', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const listAllUsers = new ListAllUsers(mockUserRepository);

    mockUserRepository.getAll.mockRejectedValueOnce(new Error('Repository error'));

    await expect(listAllUsers.execute()).rejects.toThrow('Repository error');
  });
});
