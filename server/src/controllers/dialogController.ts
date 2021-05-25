const mongoose = require("mongoose");
import jwt from "jsonwebtoken";
import express from "express";
import { CallbackError } from "mongoose";
import { Dialog, IDialog } from "../libs/dbmodels/dialog";
import { authMiddleware } from "../middlewares/auth.middleware";

const dialogController = express.Router();

dialogController.use(express.json());

dialogController.get("/dialog", authMiddleware, async (req, res) => {
  const token: string = req.headers.authorization?.split(" ")[1]!;
  const id1 = jwt.decode(token) as string;
  const id2 = req.body.id2;
  let dialog: IDialog | null = await findDialog(id1, id2);
  if (!dialog) {
    dialog = createDialog(id1, id2);
  }
  res.status(202).send(dialog);
});

//#region functions
export const findDialog = (
  iduser1: string,
  iduser2: string
): IDialog | null => {
  let dialog1: IDialog | null = new Dialog();
  Dialog.findOne({ firstId: iduser1, secondId: iduser2 }).exec(
    (err: CallbackError, dialogfromdb: IDialog | null) => {
      if (dialogfromdb !== null) {
        dialog1 = dialogfromdb;
      } else {
        console.log("could not find dialog first try");
      }
    }
  );
  if (dialog1.firstId) {
    // dialog1 exists in db
    return dialog1;
  } else {
    Dialog.findOne({ firstId: iduser2, secondId: iduser1 }).exec(
      (err: CallbackError, dialogfromdb: IDialog | null) => {
        if (dialogfromdb !== null) {
          dialog1 = dialogfromdb;
        } else {
          console.log("could not find dialog second try");
          dialog1 = null;
        }
      }
    );
    return dialog1;
  }
};

export const createDialog = (id1: string, id2: string): IDialog | null => {
  const dialognew: IDialog | null = new Dialog();
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
