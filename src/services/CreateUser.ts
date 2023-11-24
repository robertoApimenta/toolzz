import { UsersRepository } from "../repositories/UsersRepository";

interface CreateUserRequest {
  email: string
  name: string,
  password: string,
  status?: boolean,
  createdAt?: Date,
  updatedAt?: Date
};

export class CreateUser {
  constructor(
    private usersRepository: UsersRepository
  ) { };

  async execute({ email, name, password }: CreateUserRequest) {
    if (!email || !name || !password) {
      throw new Error('Fields are required')
    };
    await this.usersRepository.create({
      email, name, password
    });
  };
};
