export interface CreateUserData {
  email: string
  name: string,
  password: string,
  status?: boolean,
  createdAt?: Date,
  updatedAt?: Date
};

export interface User {
  email: string;
  name: string;
  password: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UpdateUserData {
  email?: string;
  name?: string;
  password?: string;
  status?: boolean;
};

export interface UsersRepository {
  create(data: CreateUserData): Promise<void>;
  getAll(): Promise<User[]>;
  getById(userId: number): Promise<User | null>;
  update(userId: number, data: UpdateUserData): Promise<void>;
  delete(userId: number): Promise<void>;
};
