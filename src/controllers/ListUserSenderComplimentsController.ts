import { Request, Response} from "express";
import { ListUserSenderCompliments } from "../services/ListUserSenderCompliments";

class ListUserSenderComplimentsController {
  async handle(req: Request, res:Response) {
    
    const {user_id} = req;
    
    const listUserSenderCompliments = new ListUserSenderCompliments();
    const compliments = await listUserSenderCompliments.execute(user_id);

    return res.json(compliments);
  }
}

export { ListUserSenderComplimentsController};