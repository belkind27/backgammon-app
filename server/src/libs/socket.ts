import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Event } from "../constants";
import { SERVER_PORT } from "../constants";

export const initServerWithSocket = (app: any) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on(Event.CONNECT, (socket: Socket) => {
    console.log(socket.data);

    /*     socket.on("emitNumber", (data) => {
      console.log(data);
      io.emit("recievedNumber", data);
    });

    socket.on("emitRandom", () => {
      console.log("in random");
      io.emit("randomNumber", Math.random());
    }); */
  });
  httpServer.listen(SERVER_PORT, () => {
    console.log("app is up");
  });
};
