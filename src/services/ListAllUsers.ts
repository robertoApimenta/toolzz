import { UsersRepository } from "../repositories/UsersRepository";

export interface Users {
  email: string;
  name: string;
  password: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ListAllUsers {
  constructor(private usersRepository: UsersRepository) { };

  async execute(): Promise<Users[]> {
    const users = await this.usersRepository.getAll();
    return users;
  };
};
