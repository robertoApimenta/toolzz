import { Request, Response } from 'express';
import { PrismaUsersRepository } from '../repositories/prisma/PrismaUsersRepository'
import { CreateUser } from '../services/CreateUser';
import { ListAllUsers } from '../services/ListAllUsers';
import { ListUserById } from '../services/ListUserById';
import { UpdateUser } from '../services/UpdateUser';
import { DeleteUser } from '../services/DeleteUser';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  const createUser = new CreateUser(prismaUsersRepository);

  try {
    await createUser.execute({ name, email, password });
    return res.status(201).send();
  } catch (err: any) {
    return res.status(400).send({ err: err.message });
  }
};

export const listAllUsers = async (req: Request, res: Response) => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const listAllUsers = new ListAllUsers(prismaUsersRepository);
  try {
    const users = await listAllUsers.execute();
    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const listUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const prismaUsersRepository = new PrismaUsersRepository();
  const listUserById = new ListUserById(prismaUsersRepository);
  try {
    const user = await listUserById.execute(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.status(200).json(user);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const { email, name, password, status } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();

  try {
    const updateUser = new UpdateUser(prismaUsersRepository);
    await updateUser.execute(userId, {
      email,
      name,
      password,
      status,
    });

    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  const prismaUsersRepository = new PrismaUsersRepository();

  try {
    const deleteUser = new DeleteUser(prismaUsersRepository);
    await deleteUser.execute(userId);

    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
