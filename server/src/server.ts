import express from "express";
import cors from "cors";
import { initServerWithSocket } from "../src/libs/socket";
import { loginController } from "./controllers/login.controller";

const app = express();
app.use(cors());
app.use(loginController);
initServerWithSocket(app);
