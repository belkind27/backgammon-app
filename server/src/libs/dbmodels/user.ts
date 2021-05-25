import { model, Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  id: Schema.Types.ObjectId;
  name: String;
  password: String;
  friendsIdList: string[];
  wins: number;
  loses: number;
}

const UserSchema: Schema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  password: String,
  friendsIdList: [String],
  wins: Number,
  loses: Number,
});

export const User: Model<IUser> = model("User", UserSchema);
