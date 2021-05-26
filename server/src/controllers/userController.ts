const mongoose = require("mongoose");
import express from "express";
import { IUser, User } from "../libs/dbmodels/user";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import { authMiddleware } from "../middlewares/auth.middleware";
import { stringify } from "uuid";

const userController = express.Router();

userController.use(express.json());

// finding all useres except the ones that are already our friends
userController.get("/find-all-users", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const tmp = jwt.decode(token) as { [key: string]: any };
  const id11 = tmp.userId;
  let users: Array<IUser> = await User.find();
  let idsOfNonFriends: string[] = [];
  let mainUser: IUser | null = await User.findOne({ _id: id11 }).exec();
  if (mainUser) {
    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      if (mainUser._id.toString() !== element._id.toString()) {
        if (mainUser.friendsIdList.length === 0) {
          idsOfNonFriends.push(element._id.toString());
        } else {
          mainUser.friendsIdList.forEach((friendId) => {
            if (friendId !== element._id.toString()) {
              idsOfNonFriends.push(element._id.toString());
            }
          });
        }
      }
    }
  }
  const nonFriends = [];
  for (let index = 0; index < idsOfNonFriends.length; index++) {
    const element = idsOfNonFriends[index];
    nonFriends.push(await findUser(element));
  }
  res.status(202).send(nonFriends);
});

userController.get("/find-friends", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  if (token) {
    const tmp = jwt.decode(token) as { [key: string]: any };
    const id11: string = tmp.userId;
    findFriends(id11).then((friends3) => {
      res.send(friends3);
    });
  } else res.status(202).send();
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
  if (token) {
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
  if (token) {
    const tmp = jwt.decode(token) as { [key: string]: any };
    const id11: string = tmp.userId;
    user = await findUser(id11)!;
    if (user) {
      if (isGameWon) {
        if (!user.wins) {
          user.wins = 0;
        }
        user.wins += 1;
        console.log("game won");
      } else {
        if (!user.loses) {
          user.loses = 0;
        }
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
  const friendid: string = req.query.id as string;
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
  const dd = mongoose.Types.ObjectId(id12);
  return User.findById(dd).exec();
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

export const findFriends = async (myId: string): Promise<IUser[]> => {
  let friends: Array<IUser> | null = [];
  const user1 = await findUser(myId);
  if (user1)
    for (let index = 0; index < user1?.friendsIdList.length; index++) {
      const element = user1?.friendsIdList[index];
      let friend: IUser | null = await User.findById(element);
      if (friend) friends?.push(friend);
    }
  return friends;
  // return await Promise.all(friends);
};

// the function also returns the number of friends U have, to remind U that you're lonely :)
export const makeFriend = async (
  id: string,
  friendId: string
): Promise<number> => {
  const userman: IUser | null = await findUser(id)!;
  const friendUser: IUser | null = await findUser(friendId);
  let friendnum: number = 0;
  if (userman) {
    friendnum = userman.friendsIdList.push(friendId);
    userman.save();
    friendUser?.friendsIdList.push(userman._id);
    friendUser?.save();
  }
  return friendnum;
};
export const deleteFriend = async (id: string, friendId: string) => {
  const userman: IUser | null = await findUser(id)!;
  const friendUser: IUser | null = await findUser(friendId);
  if (userman) {
    for (var i = 0; i < userman.friendsIdList.length; i++) {
      if (userman.friendsIdList[i] === friendId) {
        userman.friendsIdList.splice(i, 1);
        break;
      }
    }
    userman.save();
    if (friendUser)
      for (var i = 0; i < friendUser.friendsIdList.length; i++) {
        if (friendUser.friendsIdList[i] === id) {
          friendUser.friendsIdList.splice(i, 1);
          break;
        }
      }
    friendUser?.save();
  }
};
//#endregion

export { userController };
