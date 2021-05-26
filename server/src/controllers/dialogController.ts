const mongoose = require("mongoose");
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import express from "express";
import { CallbackError } from "mongoose";
import { Dialog, IDialog } from "../libs/dbmodels/dialog";
import { authMiddleware } from "../middlewares/auth.middleware";
import { findUser } from "../controllers/userController";
import { IUser } from "../libs/dbmodels/user";

const dialogController = express.Router();

dialogController.use(express.json());

dialogController.get("/dialog", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const tmp = jwt.decode(token) as { [key: string]: any };
  const id1: string = tmp.userId;
  const id2 = req.query.id as string;
  let dialog: IDialog | null = await findDialog(id1, id2);
  if (!dialog) {
    dialog = createDialog(id1, id2);
  }
  const friend1: IUser | null = await findUser(id2)!;
  let clientDialog;
  if (friend1) {
    const friendname1 = friend1.name;
    clientDialog = {
      id: dialog?._id,
      friendName: friendname1,
      myId: id1,
      friendId: id2,
      show: false,
      messages: dialog?.messages,
    };
  }

  res.status(202).send(clientDialog);
});

dialogController.post("/new-message", authMiddleware, async (req, res) => {
  const dialogidstring = req.body.dialogid;
  const dialogid: Schema.Types.ObjectId =
    mongoose.Types.ObjectId(dialogidstring);
  const dialog: IDialog = findDialogUsingId(dialogid)!;
  const message = req.body.msg;
  dialog.messages.push(message);
  res.status(202).send();
});

//#region functions

export const findDialogUsingId = (
  id1: Schema.Types.ObjectId
): IDialog | null => {
  let dialog1: IDialog | null = new Dialog();
  Dialog.findOne({ id: id1 }).exec(
    (err: CallbackError, dialogfromdb: IDialog | null) => {
      if (dialogfromdb) {
        dialog1 = dialogfromdb;
      } else {
        console.log("could not find dialog using id");
      }
    }
  );
  // dialog1 exists in db
  return dialog1;
};

export const findDialog = async (
  iduser1: string,
  iduser2: string
): Promise<IDialog | null> => {
  let dialog1: IDialog | null = await Dialog.findOne({
    firstId: iduser1,
    secondId: iduser2,
  }).exec();
  if (dialog1) {
    // dialog1 exists in db
    return dialog1;
  } else {
    console.log("didnt find log in first try");
    dialog1 = await Dialog.findOne({
      firstId: iduser2,
      secondId: iduser1,
    }).exec();
    if (!dialog1) console.log("didnt find log in second try");
    return dialog1;
  }
};

export const createDialog = (id1: string, id2: string): IDialog | null => {
  let dialognew: IDialog | null = new Dialog();
  dialognew.firstId = id1;
  dialognew.secondId = id2;
  dialognew
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  return dialognew;
};
//#endregion
export { dialogController };
