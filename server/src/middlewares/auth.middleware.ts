import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";

const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, JWT_KEY, {});
  } catch (err) {
    res.status(401);
  }
  next();
};

export { authMiddleware };
