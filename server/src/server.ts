import express from "express";
import cors from "cors";
import { initServerWithSocket } from "../src/libs/socket";
import { loginController } from "./controllers/login.controller";
import { userController } from "./controllers/userController";
import { dialogController } from "./controllers/dialogController";
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(loginController);
app.use(userController);
app.use(dialogController);
const dbURI =
  "mongodb+srv://gameguy:gameguy100@cluster0.f6bsm.mongodb.net/BackgammonDB?retryWrites=true&w=majority";
//mongodb+srv://<username>:<password>@cluster0.f6bsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err: any) => {
    console.log(err);
  });
initServerWithSocket(app);
