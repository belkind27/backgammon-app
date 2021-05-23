const mongoose =  require('mongoose');
import express from "express";
import {  IUser , User } from "../libs/dbmodels/user";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";


const userController = express.Router();

userController.use(express.json());

userController.get("/find-all-users", async (req, res) => {
    const users: Array<IUser> = await User.find();  
    res.status(202).send(users);
  });
  



userController.get("/find-user", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
 //   const id11 = jwt.decode(token).id ;
    
  });


