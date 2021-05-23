const mongoose =  require('mongoose');
import express from "express";
import {  Dialog , IDialog } from "../libs/dbmodels/dialog";
import { authMiddleware } from '../middlewares/auth.middleware';


const dialogController = express.Router();

dialogController.use(express.json());

dialogController.get("/dialog", authMiddleware ,  async (req, res) => {
    
    const dialogs: Array<IDialog> = await Dialog.find();  
    res.status(202).send(dialogs);
  });