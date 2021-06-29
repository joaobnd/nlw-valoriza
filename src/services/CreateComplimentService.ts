import { getCustomRepository} from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  user_sender: string,
  user_receiver: string,
  tag_id: string,
  message: string
}

class CreateComplimentService {

  async execute({user_sender, user_receiver, tag_id, message} : IComplimentRequest) {

    const complimentsRepository = await getCustomRepository(ComplimentsRepositories);
    const usersRepository = await getCustomRepository(UsersRepositories);

    if(user_sender === user_receiver) {
      throw new Error("não é permitido um usuário cadastrar um elogio para si mesmo!")
    }

    const receiverExists = await usersRepository.findOne(user_receiver);

    if(!receiverExists) {
      throw new Error("não é permitido cadastrar elogios para usuários inválidos!")
    }

    const compliment = complimentsRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message
    })

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };