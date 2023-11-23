import { prisma } from "../../prisma";
import { CreateUserData, UsersRepository } from "../UsersRepository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserData) {
    await prisma.user.create({
      data
    })
  }
}
