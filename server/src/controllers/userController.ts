const mongoose =  require('mongoose');
import express from "express";
import {  IUser , User } from "../libs/dbmodels/user";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";
import { CallbackError } from "mongoose";


const userController = express.Router();

userController.use(express.json());

// finding all useres except the ones that are already our friends
userController.get("/find-all-users", async (req, res) => {
    const token : string = req.headers.authorization?.split(" ")[1]!;       
    const id11 = jwt.decode(token) ;
 
    const users: Array<IUser> = await User.find(); 
    let mainuser : IUser = new User() ;
    mainuser.name = 'NoName367'; // just to know that it is not a real user
    User.findOne({_id : id11}).exec((err:CallbackError, user22 :IUser | null) =>{
    if(user22 !== null){
        mainuser = user22;
    } else {
        console.log('could not find user');       
      }
    }) ;
   
    users.filter(userelement => userelement.id !== mainuser.id)
    if(mainuser.name !== 'NoName367') // if it is not null
    mainuser.friendsIdList.forEach(friendelement =>{
        users.filter(userelement => userelement.id !== friendelement.id)
    });          
    res.status(202).send(users);
  });
  



userController.get("/find-user", async (req, res) => {
    const token : string = req.headers.authorization?.split(" ")[1]!;   
    if(token !== undefined){
        const id11 = jwt.decode(token) ;
        res.send(User.findById(id11));
    }
    else console.log('token undefined')
  });

 
  export { userController} ;


