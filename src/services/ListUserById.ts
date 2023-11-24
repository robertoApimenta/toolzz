import { UsersRepository } from "../repositories/UsersRepository";

export interface User {
  email: string;
  name: string;
  password: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ListUserById {
  constructor(private usersRepository: UsersRepository) { };

  async execute(userId: number): Promise<User | null> {
    const existingUser = await this.usersRepository.getById(userId);

    if (!existingUser) {
      throw new Error(`Usuário com o ID ${userId} não encontrado`);
    };

    return existingUser;
  };
};
