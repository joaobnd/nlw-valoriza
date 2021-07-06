import { Request, Response} from "express";
import {ListTagService} from "../services/ListTagService";

class ListTagController {
  async handle(req:Request, res:Response) {
    
    const listTagService = new ListTagService();

    const tags = await listTagService.execute();
    // let /\ tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}`}));

    return res.json(tags);

  }
}

export { ListTagController };