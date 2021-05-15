import express from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";

const loginController = express.Router();

loginController.use(express.json());

loginController.post("/Login", (req, res) => {
  // db logic

  const userId = "12345";
  const token = jwt.sign({ id: userId }, JWT_KEY, { expiresIn: "1D" });
  res.status(200).json({ token: token });
});

export { loginController };
