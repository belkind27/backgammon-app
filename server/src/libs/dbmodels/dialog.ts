import { Schema } from "mongoose";

export const Dialog = new Schema({
  id: Schema.Types.ObjectId,
  FirstId: String,
  secondId: String,
  messages: [{ content: String, time: Date, senderId: Schema.Types.ObjectId }],
});
