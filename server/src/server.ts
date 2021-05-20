import express from "express";
import cors from "cors";
import { initServerWithSocket } from "../src/libs/socket";

const mongoose = require('mongoose');
const dialogModel = require('./libs/dbmodels/dialog');
const userModel = require('./libs/dbmodels/user');


const app = express();
app.use(cors());
initServerWithSocket(app);

const dbURI = 'mongodb+srv://gameguy:gameguy100@cluster0.f6bsm.mongodb.net/BackgammonDB?retryWrites=true&w=majority';
mongoose.connect(dbURI , { useNewUrlParser : true , useUnifiedTopology : true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })



       