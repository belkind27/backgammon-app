import { model, Schema, Model, Document } from 'mongoose';

export interface IDialog extends Document {
    id : Schema.Types.ObjectId,
    FirstId:  String, 
    secondId :   String,
    messages : [{ content : String, time: Date , senderId : Schema.Types.ObjectId }]   
}

const dialogSchema = new Schema({
    id : Schema.Types.ObjectId,
    FirstId:  String, 
    secondId :   String,
    messages : [{ content : String, time: Date , senderId : Schema.Types.ObjectId }]   
  });

 export const Dialog: Model<IDialog> = model('Dialog', dialogSchema);