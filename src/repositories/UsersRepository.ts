export interface CreateUserData {
  email: string
  name: string,
  password: string,
  status?: boolean,
  createdAt?: Date,
  updatedAt?: Date
}

export interface UsersRepository {
  create(data: CreateUserData): Promise<void>
}
