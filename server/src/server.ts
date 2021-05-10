import express from "express";
import cors from "cors";
import { initServerWithSocket } from "../src/libs/socket";

const app = express();
app.use(cors());
initServerWithSocket(app);

