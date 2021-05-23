import { Schema } from "mongoose";

export const User = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  password: String,
  friendsIdList: [{ id: Schema.Types.ObjectId }],
});
