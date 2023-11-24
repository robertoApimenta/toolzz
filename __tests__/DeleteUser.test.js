const { DeleteUser } = require('../src/services/DeleteUser');
const { PrismaUsersRepository } = require('../src/repositories/prisma/PrismaUsersRepository');

jest.mock('../src/repositories/prisma/PrismaUsersRepository');

describe('DeleteUser Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a user by ID', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const deleteUser = new DeleteUser(mockUserRepository);

    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', password: 'password123' };

    mockUserRepository.getById.mockResolvedValueOnce(mockUser);

    mockUserRepository.delete.mockResolvedValueOnce();

    await deleteUser.execute(1);

    expect(mockUserRepository.getById).toHaveBeenCalledWith(1);
    expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should handle user not found', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const deleteUser = new DeleteUser(mockUserRepository);

    mockUserRepository.getById.mockResolvedValueOnce(null);

    await expect(deleteUser.execute(1)).rejects.toThrow('Usuário com o ID 1 não encontrado');
  });

  it('should handle repository error', async () => {
    const mockUserRepository = new PrismaUsersRepository();
    const deleteUser = new DeleteUser(mockUserRepository);

    mockUserRepository.getById.mockResolvedValueOnce({ id: 1, email: 'test@example.com', name: 'Test User', password: 'password123' });

    mockUserRepository.delete.mockRejectedValueOnce(new Error('Repository error'));

    await expect(deleteUser.execute(1)).rejects.toThrow('Repository error');
  });
});
