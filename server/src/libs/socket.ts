import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Event } from "../constants";
import { SERVER_PORT } from "../constants";

export const initServerWithSocket = (app: any) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    // ...
  });

  io.on(Event.CONNECT, (socket: Socket) => {
    // ...
  });
  httpServer.listen(SERVER_PORT);
};
