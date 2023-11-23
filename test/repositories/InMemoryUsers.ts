import { User } from "@prisma/client";
import { CreateUserData, UsersRepository } from "../../src/repositories/UsersRepository";

export class InMemoryUsers implements UsersRepository {
  public items: User[] = [];
  async create(data: CreateUserData) {
    this.items.push({
      id: 1,
      email: data.email,
      name: data.name,
      password: data.password,
      status: data.status ?? null,
      createdAt: data.createdAt ?? null,
      updatedAt: data.updatedAt ?? null
    })
  }
}
