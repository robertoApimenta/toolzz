const { ListUserById } = require('../src/services/ListUserById');
const { PrismaUsersRepository } = require('../src/repositories/prisma/PrismaUsersRepository');

jest.mock('../src/repositories/prisma/PrismaUsersRepository');

describe('ListUserById Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user by ID', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const listUserById = new ListUserById(mockUserRepository);

    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', password: 'password123' };

    mockUserRepository.getById.mockResolvedValueOnce(mockUser);

    const result = await listUserById.execute(1);

    expect(mockUserRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  it('should handle user not found', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const listUserById = new ListUserById(mockUserRepository);

    mockUserRepository.getById.mockResolvedValueOnce(null);

    await expect(listUserById.execute(1)).rejects.toThrow('Usuário com o ID 1 não encontrado');
  });

  it('should handle repository error', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const listUserById = new ListUserById(mockUserRepository);

    mockUserRepository.getById.mockRejectedValueOnce(new Error('Repository error'));

    await expect(listUserById.execute(1)).rejects.toThrow('Repository error');
  });
});
