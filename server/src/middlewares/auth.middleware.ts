import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";

const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.sendStatus(401);
    } else {
      jwt.verify(token, JWT_KEY, {});
      next();
    }
  } catch (err) {
    return res.sendStatus(401);
  }
};

export { authMiddleware };
