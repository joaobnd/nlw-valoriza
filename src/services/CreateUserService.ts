import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string
  email: string
  admin?: boolean
}

class CreateUserService {

  async execute({name, email, admin} : IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if(!email) {
      throw new Error("email invalido")
    }

    //SELECT * FROM users WHERE EMAIL = 'email'
    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("email ja existe")
    }

    const user = usersRepository.create({
      name,
      email,
      admin
    })

    await usersRepository.save(user);

    return user;

  }
}

export { CreateUserService };