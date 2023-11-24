import { prisma } from "../../prisma";
import { CreateUserData, User, UsersRepository, UpdateUserData } from "../UsersRepository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserData) {
    await prisma.user.create({
      data
    });
  };

  async getAll(): Promise<User[]> {
    const usersFromPrisma = await prisma.user.findMany();

    const users: User[] = usersFromPrisma.map((userFromPrisma) => ({
      email: userFromPrisma.email,
      name: userFromPrisma.name,
      password: userFromPrisma.password,
      status: userFromPrisma.status || false,
      createdAt: userFromPrisma.createdAt || new Date(),
      updatedAt: userFromPrisma.updatedAt || new Date(),
    }));

    return users;
  };

  async getById(userId: number): Promise<User | null> {
    const userFromPrisma = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userFromPrisma) {
      return null;
    };

    return {
      email: userFromPrisma.email,
      name: userFromPrisma.name,
      password: userFromPrisma.password,
      status: userFromPrisma.status || false,
      createdAt: userFromPrisma.createdAt || new Date(),
      updatedAt: userFromPrisma.updatedAt || new Date(),
    };
  };

  async update(userId: number, data: UpdateUserData): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data,
    });
  };

  async delete(userId: number): Promise<void> {
    await prisma.user.delete({
      where: { id: userId },
    });
  };
};
