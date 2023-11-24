import { Router } from "express";

import { createUser, listAllUsers, listUserById, updateUser, deleteUser } from "./controllers/UsersController";

export const router = Router();

router.post('/users', createUser);

router.get('/users', listAllUsers);

router.get('/users/:id', listUserById);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);
