import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({email});

    if(!user) {
      throw new Error("credenciais inválidas")
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("credenciais inválidas");
    }

    const token = sign(
      {
        email: user.email
      },
      "a0fee4b653acf65ee358468e31bffbd9",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;

  }


}

export { AuthenticateUserService };