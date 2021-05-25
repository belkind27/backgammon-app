import { model, Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  id: Schema.Types.ObjectId;
  name: String;
  password: String;
  friendsIdList: Schema.Types.ObjectId[];
  wins: number;
  loses: number;
}

const UserSchema: Schema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  password: String,
  friendsIdList: [Schema.Types.ObjectId],
  wins: 0,
  loses: 0,
});

export const User: Model<IUser> = model("User", UserSchema);
