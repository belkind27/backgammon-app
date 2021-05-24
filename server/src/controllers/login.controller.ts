import express from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";
import {  Schema } from 'mongoose';
import {  IUser , User } from "../libs/dbmodels/user";



const loginController = express.Router();

loginController.use(express.json());

loginController.post("/Login", (req, res) => {
  // db logic
  const name1 = req.body.userName
  const password1 = req.body.userPassword

  // creating a sample of the user
  const usersample : IUser = new User({
    id: Schema.Types.ObjectId ,
    name: name1,
    password1: password1
  });
  

  function findall() {
   User.find();
  }

  // creating new user if it does not exist
  function createuser(){
   
    usersample.save()
      .then((result) => {
        console.log(result)
      })
      .catch((err) =>{
        console.log(err);
      });
  }

  const userId = usersample.id;


  const token = jwt.sign({ id: userId }, JWT_KEY, { expiresIn: "1D" });
  res.status(200).json({ token: token });
});


export { loginController };
