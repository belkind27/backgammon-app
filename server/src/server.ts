import express from "express";
import cors from "cors";
import { initServerWithSocket } from "../src/libs/socket";
import { loginController } from "./controllers/login.controller";

const app = express();
app.use(cors());
app.use(loginController);
initServerWithSocket(app);
<<<<<<< HEAD


const mongoose = require('mongoose');
const Dialog = require('./libs/dbmodels/dialog');
const User= require('./libs/dbmodels/user');


// jwt.decode(token)

const dbURI = 'mongodb+srv://gameguy:gameguy100@cluster0.f6bsm.mongodb.net/BackgammonDB?retryWrites=true&w=majority';
mongoose.connect(dbURI , { useNewUrlParser : true , useUnifiedTopology : true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.log(err)
       })


app.get('/find-all-users', (req,res) =>{
    User.find()
       .then((result) => {
           res.send(result)
       })
} )       
=======
>>>>>>> main
