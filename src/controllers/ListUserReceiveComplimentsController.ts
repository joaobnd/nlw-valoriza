import { Request, Response} from "express";
import { ListUserReceiveCompliments } from "../services/ListUserReceiveCompliments";

class ListUserReceiveComplimentsController {
  async handle(req: Request, res:Response) {
    
    const {user_id} = req;
    
    const listUserReceiveCompliments = new ListUserReceiveCompliments();
    const compliments = await listUserReceiveCompliments.execute(user_id);

    return res.json(compliments);
  }
}

export { ListUserReceiveComplimentsController};