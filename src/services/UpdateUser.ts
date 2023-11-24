import { UsersRepository, UpdateUserData } from "../repositories/UsersRepository";

export class UpdateUser {
  constructor(private usersRepository: UsersRepository) { };

  async execute(userId: number, data: UpdateUserData): Promise<void> {
    const existingUser = await this.usersRepository.getById(userId);

    if (!existingUser) {
      throw new Error(`Usuário com o ID ${userId} não encontrado`);
    };
    await this.usersRepository.update(userId, data);
  };
};

