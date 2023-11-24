import { UsersRepository } from "../repositories/UsersRepository";

export class DeleteUser {
  constructor(private usersRepository: UsersRepository) { };

  async execute(userId: number): Promise<void> {
    const existingUser = await this.usersRepository.getById(userId);

    if (!existingUser) {
      throw new Error(`Usuário com o ID ${userId} não encontrado`);
    };
    await this.usersRepository.delete(userId);
  };
};
