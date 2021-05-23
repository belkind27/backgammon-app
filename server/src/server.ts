import express from "express";
import cors from "cors";
import { initServerWithSocket } from "../src/libs/socket";
import { loginController } from "./controllers/login.controller";
const mongoose =  require('mongoose');
import { Dialog , IDialog } from "./libs/dbmodels/dialog";
import { User, IUser } from "./libs/dbmodels/user";

const app = express();
app.use(cors());
app.use(loginController);
const dbURI =
  "mongodb+srv://gameguy:gameguy100@cluster0.f6bsm.mongodb.net/BackgammonDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err: any) => {
    console.log(err);
  });
initServerWithSocket(app);
// jwt.decode(token)



app.get("/find-all-users", async (req, res) => {
  const users: Array<IUser> = await User.find();  
  res.status(202).send(users);
});

