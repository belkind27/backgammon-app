import { model, Schema, Model, Document } from "mongoose";

export interface IDialog extends Document {
  id: Schema.Types.ObjectId;
  firstId: String;
  secondId: String;
  messages: [{ content: String; time: Date; senderId: string }];
}

const dialogSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstId: String,
  secondId: String,
  messages: [{ content: String, time: Date, senderId: String }],
});

export const Dialog: Model<IDialog> = model("Dialog", dialogSchema);
