const mongoose = require("mongoose");
import express from "express";
import { IUser, User } from "../libs/dbmodels/user";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";
import { CallbackError, Schema } from "mongoose";
import { authMiddleware } from "../middlewares/auth.middleware";

const userController = express.Router();

userController.use(express.json());

// finding all useres except the ones that are already our friends
userController.get("/find-all-users", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const tmp = jwt.decode(token) as { [key: string]: any };
  const id11 = tmp.userId;

  let users: Array<IUser> = await User.find();
  let mainuser: IUser | null = await User.findOne({ _id: id11 }).exec();
  if (mainuser) {
    users = users.filter((userelement) => userelement._id !== mainuser?._id);
    if (mainuser.name)
      // user is not null
      mainuser.friendsIdList.forEach((friendelement) => {
        users = users.filter(
          (userelement) => userelement._id !== friendelement
        );
      });
  }
  res.status(202).send(users);
});

userController.get("/find-friends", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  let user1: IUser | null;
  let friends: Array<IUser> | null = null;
  if (token !== undefined) {
    const tmp = jwt.decode(token) as { [key: string]: any };
    const id11: string = tmp.userId;
    user1 = await findUser(id11);
    user1?.friendsIdList.forEach(async (friendelementid) => {
      let friend: IUser | null = await findUserUsingId(friendelementid);
      if (friend) friends?.push(friend);
    }); // if friend exist then push it into arrey
  } else console.log("token undefined");

  res.send(friends);
});

userController.get("/find-user", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  let user1: IUser | null = new User();
  if (token) {
    const tmp = jwt.decode(token) as { [key: string]: any };
    const id11: string = tmp.userId;
    user1 = await findUser(id11);
  } else console.log("token undefined");
  res.status(202).send(user1);
});

userController.post("/add-friend", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const friendid = req.body.userId;
  if (token !== undefined) {
    const tmp = jwt.decode(token) as { [key: string]: any };
    const id11: string = tmp.userId;
    makeFriend(id11, friendid);
    console.log("you have a friend");
  } else console.log("token undefined");
  res.status(202).send();
});

userController.post("/game-result", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const isGameWon: boolean = req.body.isGameWon;
  let user: IUser | null;
  if (token !== undefined) {
    const tmp = jwt.decode(token) as { [key: string]: any };
    const id11: string = tmp.userId;
    user = await findUser(id11)!;
    if (user) {
      if (isGameWon) {
        user.wins += 1;
        console.log("game won");
      } else {
        user.loses += 1;
        console.log("game lost");
      }
      user.save();
    }
  } else console.log("token undefined");
  res.status(202).send();
});

userController.delete("/delete-friend", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const friendid = req.params.id;
  //probably not much of a friend
  if (token !== undefined) {
    const tmp = jwt.decode(token) as { [key: string]: any };
    const id11: string = tmp.userId;
    deleteFriend(id11, friendid);
    console.log("you have lost a friend");
  } else console.log("token undefined");
  res.status(202).send();
});

//#region functions
export const findUser = async (id12: string): Promise<IUser | null> => {
  const idobject = mongoose.Types.ObjectId(id12);
  return User.findById(idobject).exec();
};

export const findUserUsingId = async (
  id12: Schema.Types.ObjectId
): Promise<IUser | null> => {
  return User.findById(id12).exec();
};

export const findUserbydetails = async (
  name1: string,
  password1: string
): Promise<IUser | null> => {
  return User.findOne({ name: name1, password: password1 }).exec();
};

// the function also returns the number of friends U have, to remind U that you're lonely :)
export const makeFriend = async (
  id: string,
  friendId: string
): Promise<number> => {
  const userman: IUser | null = await findUser(id)!;
  const friendid2 = mongoose.Types.ObjectId(friendId);
  let friendnum: number = 0;
  if (userman) {
    friendnum = userman.friendsIdList.push(friendid2);
    userman.save();
  }
  return friendnum;
};
export const deleteFriend = async (id: string, friendId: string) => {
  const userman: IUser | null = await findUser(id)!;
  const friendid2 = mongoose.Types.ObjectId(friendId);
  if (userman) {
    userman.friendsIdList = userman.friendsIdList.filter(
      (idelement) => idelement !== friendid2
    );
    userman.save();
  }
};
//#endregion

export { userController };
