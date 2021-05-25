import express from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";
import { Mongoose, Schema } from "mongoose";
const mongoose = require("mongoose");
import { IUser, User } from "../libs/dbmodels/user";
import { findUser, findUserbydetails } from "../controllers/userController";

const loginController = express.Router();

loginController.use(express.json());

loginController.post("/Login", (req, res) => {
  const name1 = req.body.userName;
  const password1 = req.body.userPassword;

  // creating a sample of the user
  let userSample: IUser = new User({
    name: name1,
    password1: password1,
  });
  const userLogged = findUserbydetails(name1, password1);
  if (userLogged) {
    userSample = userLogged;
  } else {
    userSample
      .save()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const userId = userSample._id;
  const token = jwt.sign({userId}, JWT_KEY, { expiresIn: "1D" });
  res.status(200).json({ token: token });
});

export { loginController };
