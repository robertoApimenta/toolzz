const { UpdateUser } = require('../src/services/UpdateUser');
const { PrismaUsersRepository } = require('../src/repositories/prisma/PrismaUsersRepository');

jest.mock('../src/repositories/prisma/PrismaUsersRepository');

describe('UpdateUser Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a user by ID', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const updateUser = new UpdateUser(mockUserRepository);

    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', password: 'password123' };
    const updatedUserData = { name: 'Updated User' };

    mockUserRepository.getById.mockResolvedValueOnce(mockUser);

    mockUserRepository.update.mockResolvedValueOnce();

    await updateUser.execute(1, updatedUserData);

    expect(mockUserRepository.getById).toHaveBeenCalledWith(1);
    expect(mockUserRepository.update).toHaveBeenCalledWith(1, updatedUserData);
  });

  it('should handle user not found', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const updateUser = new UpdateUser(mockUserRepository);

    mockUserRepository.getById.mockResolvedValueOnce(null);

    await expect(updateUser.execute(1, {})).rejects.toThrow('Usuário com o ID 1 não encontrado');
  });

  it('should handle repository error', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const updateUser = new UpdateUser(mockUserRepository);

    mockUserRepository.getById.mockResolvedValueOnce({ id: 1, email: 'test@example.com', name: 'Test User', password: 'password123' });

    mockUserRepository.update.mockRejectedValueOnce(new Error('Repository error'));

    await expect(updateUser.execute(1, {})).rejects.toThrow('Repository error');
  });
});
