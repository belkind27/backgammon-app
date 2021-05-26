import express from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";
import { User } from "../libs/dbmodels/user";
import { findUserbydetails } from "../controllers/userController";

const loginController = express.Router();

loginController.use(express.json());

loginController.post("/Login", async (req, res) => {
  const name1 = req.body.userName;
  const password1 = req.body.userPassword;
  let userLogged = await findUserbydetails(name1, password1);
  if (userLogged) {
    console.log("in db already", userLogged);
  } else {
    userLogged = new User({
      name: name1,
      password: password1,
    });
    userLogged
      .save()
      .then((result) => {
        console.log("created new", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const userId = userLogged._id;
  const token = jwt.sign({ userId }, JWT_KEY, { expiresIn: "1D" });
  res.status(200).json({ token: token });
});

export { loginController };
