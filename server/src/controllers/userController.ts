const mongoose = require("mongoose");
import express from "express";
import { IUser, User } from "../libs/dbmodels/user";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";
import { CallbackError, Schema } from "mongoose";

const userController = express.Router();

userController.use(express.json());

// finding all useres except the ones that are already our friends
userController.get("/find-all-users", async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const id11 = jwt.decode(token);
  const users: Array<IUser> = await User.find();
  let mainuser: IUser = new User();
  User.findOne({ _id: id11 }).exec(
    (err: CallbackError, user22: IUser | null) => {
      if (user22 !== null) {
        mainuser = user22;
      } else {
        console.log("could not find user");
      }
    }
  );
  let tempusers = users.filter((userelement) => userelement.id !== mainuser.id);
  if (mainuser.name)
    // user is not null
    mainuser.friendsIdList.forEach((friendelement) => {
      tempusers = tempusers.filter(
        (userelement) => userelement.id !== friendelement
      );
    });
  res.status(202).send(tempusers);
});

userController.get("/find-friends", async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  let user1: IUser | null = new User();
  let friends: Array<IUser> | null = null;
  if (token !== undefined) {
    const id11: string = jwt.decode(token) as string;
    user1 = findUser(id11);
  } else console.log("token undefined");
  user1?.friendsIdList.forEach((friendelementid) => {
    let friend: IUser | null = findUserUsingId(friendelementid);
    if (friend) friends?.push(friend); // if friend exist then push it io arrey
  });
  res.send(friends);
});

userController.get("/find-user", async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  let user1: IUser | null = new User();
  if (token !== undefined) {
    const id11: string = jwt.decode(token) as string;
    user1 = findUser(id11);
  } else console.log("token undefined");
  res.status(202).send(user1);
});

userController.post("/add-friend", async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const friendid = req.body.userid;
  if (token !== undefined) {
    const id11: string = jwt.decode(token) as string;
    makeFriend(id11, friendid);
    console.log("you have a friend");
  } else console.log("token undefined");
  res.status(202).send();
});

userController.post("/game-result", async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const isGameWon: boolean = req.body.isGameWon;
  let user: IUser;
  if (token !== undefined) {
    const id11: string = jwt.decode(token) as string;
    user = findUser(id11)!;
    if (isGameWon) {
      user.wins += 1;
      console.log("game won");
    } else {
      user.loses += 1;
      console.log("game lost");
    }
    user.save();
  } else console.log("token undefined");
  res.status(202).send();
});

userController.delete("/delete-friend", async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const friendid = req.params.id;
  //probably not much of a friend
  if (token !== undefined) {
    const id11: string = jwt.decode(token) as string;
    deleteFriend(id11, friendid);
    console.log("you have lost a friend");
  } else console.log("token undefined");
  res.status(202).send();
});

//#region functions
export const findUser = (id12: string): IUser | null => {
  let user1: IUser = new User();
  const idobject = mongoose.Types.ObjectId(id12);
  User.findById(idobject).exec((err: CallbackError, user22: IUser | null) => {
    if (user22 !== null) {
      user1 = user22;
    } else console.log("could not find user" + err?.message);
  });
  return user1;
};

export const findUserUsingId = (id12: Schema.Types.ObjectId): IUser | null => {
  let user1: IUser | null = new User();
  User.findById(id12).exec((err: CallbackError, user22: IUser | null) => {
    if (user22 !== null) {
      user1 = user22;
    } else {
      console.log("could not find user" + err?.message);
      user1 = null;
    }
  });
  return user1;
};

export const findUserbydetails = (
  name1: string,
  password1: string
): IUser | null => {
  let user1: IUser = new User();
  User.findOne({ name: name1, password: password1 }).exec(
    (err: CallbackError, userfromdb: IUser | null) => {
      if (userfromdb !== null) {
        user1 = userfromdb;
      } else {
        console.log("could not find user");
      }
    }
  );
  if ((user1.name = name1)) return user1;
  else return null;
};

// the function also returns the number of friends U have, to remind U that you're lonely :)
export const makeFriend = (id: string, friendId: string): number => {
  const userman: IUser = findUser(id)!;
  const friendid2 = mongoose.Types.ObjectId(friendId);
  const friendnum: number = userman.friendsIdList.push(friendid2);
  userman.save();
  return friendnum;
};
export const deleteFriend = (id: string, friendId: string) => {
  const userman: IUser = findUser(id)!;
  const friendid2 = mongoose.Types.ObjectId(friendId);
  userman.friendsIdList = userman.friendsIdList.filter(
    (idelement) => idelement !== friendid2
  );
  userman.save();
};
//#endregion

export { userController };
