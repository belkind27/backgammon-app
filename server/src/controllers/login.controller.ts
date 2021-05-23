import express from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";
<<<<<<< HEAD
import { Usermodel } from "../models";
const User = require('./libs/dbmodels/user');
=======
>>>>>>> main

const loginController = express.Router();

loginController.use(express.json());

loginController.post("/Login", (req, res) => {
  // db logic
<<<<<<< HEAD
  const name1 = req.body.userName
  const password1 = req.body.userPassword

  // creating a sample of the user
  const usersample = new User({
    id: new mongoose.Types.ObjectId();
    name: name1,
    password1: password1
  });
  

  function checkIfUserExist() : Boolean{
   User.findById
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

  const userId = "12345";


=======

  const userId = "12345";
>>>>>>> main
  const token = jwt.sign({ id: userId }, JWT_KEY, { expiresIn: "1D" });
  res.status(200).json({ token: token });
});

<<<<<<< HEAD



=======
>>>>>>> main
export { loginController };
