import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
  ) {

      const bearer = req.headers.authorization;

      if(!bearer) {
        return res.status(401).end();
      }

      const [,token] = bearer.split(" ");

      try {
        const { sub } = verify(token, "a0fee4b653acf65ee358468e31bffbd9") as IPayload;

        req.user_id = sub;

        return next();
      }
      catch(err) {
        return res.status(401).end(); 
      }
    }