import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Event, SocketUser, User } from "../models";
import { SERVER_PORT } from "../constants";
import { v4 as uuidv4 } from "uuid";

export const initServerWithSocket = (app: any) => {
  // random play prop
  let isRandomPlayReq = false;
  let userId = "";
  let room = "";

  // who's connected prop
  let connectedUsers: SocketUser[] = [];

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });
  // initial connection
  io.on(Event.CONNECT, (socket: Socket) => {
    // on disconnect remove user from connected
    socket.on(Event.DISCONNECT, (_) => {
      for (let index = 0; index < connectedUsers.length; index++) {
        const element = connectedUsers[index];
        if (element.socketId === socket.id) {
          connectedUsers.splice(index, 1);
        }
      }
      /*      connectedUsers = connectedUsers.filter((user) => {
        user.socketId !== socket.id;
      }); */
      io.emit(
        Event.USER_CONNECTED,
        connectedUsers.map((user) => {
          return user.userId;
        })
      );
    });
    // on login add to connected and emit to everybody
    socket.on(Event.LOGIN, (id: string) => {
      let isNew = true;
      for (let index = 0; index < connectedUsers.length; index++) {
        const element = connectedUsers[index];
        if (element.userId === id) {
          isNew = false;
          element.socketId = socket.id;
        }
      }
      if (isNew) {
        connectedUsers.push({
          socketId: socket.id,
          userId: id,
          socket: socket,
        });
      }
      io.emit(
        Event.USER_CONNECTED,
        connectedUsers.map((user) => {
          return user.userId;
        })
      );
    });
    // on play with random put flag of someone wants to play and create room when second player wants random
    socket.on(Event.PLAY_WITH_RANDOM, () => {
      if (!isRandomPlayReq) {
        isRandomPlayReq = true;
        userId = socket.id;
        room = uuidv4();
        socket.join(room);
      } else {
        isRandomPlayReq = false;
        socket.join(room);
        io.to(userId).emit(`random`, room, "black");
        io.to(socket.id).emit(`random`, room, "white");
      }
    });
    socket.on(Event.PLAY_WITH_FRIEND, (userToPlayId: string) => {
      const userToPlay = connectedUsers.find(
        (user) => user.userId === userToPlayId
      );
      if (userToPlay) {
        const yourId = connectedUsers.find(
          (user) => user.socketId === socket.id
        )?.userId;
        io.to(userToPlay.socketId).emit(Event.INVITE_RECEIVED, yourId);
      }
    });
    socket.on(Event.ACCEPT_INVITE, (userToPlayId: string) => {
      const playroom = uuidv4();
      const userToPlay = connectedUsers.find(
        (user) => user.userId === userToPlayId
      );
      if (userToPlay) {
        io.to(userToPlay.socketId).emit(`play`, playroom, "black");
        io.to(socket.id).emit(`play`, playroom, "white");
      }
    });
    // on turn played send data between users in room
    socket.on(Event.TURN_PLAYED, (room: string, gameChange: any) => {
      socket.to(room).emit("next", gameChange);
    });
    // leave room when game end
    socket.on(Event.GAME_ENDED, (room: string) => {
      socket.leave(room);
    });
    // on open chat room create and send room
    socket.on(Event.OPEN_CHAT_ROOM, (userToChatId: string) => {
      const userToChat = connectedUsers.find(
        (user) => user.userId === userToChatId
      );
      const you = connectedUsers.find((user) => user.socketId === socket.id);
      if (userToChat && you) {
        const chatroom = uuidv4();
        socket.join(chatroom);
        userToChat.socket.join(chatroom);
        io.to(userToChat.socketId).emit(`chatRoom`, {
          chat: chatroom,
          id: you.userId,
        });
        io.to(socket.id).emit(`chatRoom`, {
          chat: chatroom,
          id: userToChat.userId,
        });
      }
    });
    socket.on(Event.CHAT_CREATED, (id: string) => {
      const user = connectedUsers.find((user) => user.userId === id);
      if (user) {
        const yourId = connectedUsers.find(
          (user) => user.socketId === socket.id
        )?.userId;
        io.to(user?.socketId).emit("timeToGetChat", yourId);
      }
    });
    socket.on(Event.MESSAGE, (room: string, message: any, chatId: string) => {
      io.to(room).emit(Event.MESSAGE_RECEIVED, { msg: message, id: chatId });
    });
  });
  httpServer.listen(SERVER_PORT);
};
