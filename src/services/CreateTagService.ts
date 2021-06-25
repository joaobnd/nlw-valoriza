import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {

  async execute(name: string) {

    const tagsRepository = getCustomRepository(TagsRepositories);

    if(!name) {
      throw new Error("tag sem nome");
    }

    // SELECT * FROM TAGS WHERE NAME = 'name'
    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error("ja existe uma tag com esse nome");
    }

    const tag = tagsRepository.create({ name });

    await tagsRepository.save(tag);

    return tag;


  }

}

export { CreateTagService };