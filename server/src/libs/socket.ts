import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Event, User } from "../models";
import { SERVER_PORT } from "../constants";
import { v4 as uuidv4 } from "uuid";

export const initServerWithSocket = (app: any) => {
  // random play logic
  let isRandomPlayReq = false;
  let userId = "";
  let room = "";
  //
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on(Event.CONNECT, (socket: Socket) => {
    socket.on(Event.LOGIN, (user: User) => {
      console.log(user);
    });
    socket.on(Event.PLAY_WITH_RANDOM, () => {
      if (!isRandomPlayReq) {
        isRandomPlayReq = true;
        userId = socket.id;
        room = uuidv4();
        socket.join(room);
      } else {
        isRandomPlayReq = false;
        socket.join(room);
        io.emit(`${userId}-random`, room, "black");
        io.emit(`${socket.id}-random`, room, "white");
      }
    });
    socket.on(Event.TURN_PLAYED, (room: string, gameChange: any) => {
      socket.to(room).emit("next", gameChange);
    });
    socket.on(Event.GAME_ENDED, (room: string) => {
      socket.leave(room);
    });
  });
  httpServer.listen(SERVER_PORT);
};
