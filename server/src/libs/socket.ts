import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Event, User } from "../models";
import { SERVER_PORT } from "../constants";

export const initServerWithSocket = (app: any) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on(Event.CONNECT, (socket: Socket) => {
    socket.on(Event.LOGIN, (user: User) => {
      console.log(user);
    });
  });
  httpServer.listen(SERVER_PORT);
};
