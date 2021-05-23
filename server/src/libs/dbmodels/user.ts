import { model, Schema, Model, Document } from 'mongoose';


export interface IUser extends Document {
     id : Schema.Types.ObjectId,
    name:  String, 
    password:   String,
    friendsIdList: [{ id : Schema.Types.ObjectId }] 
}

const UserSchema: Schema = new Schema({
    id : Schema.Types.ObjectId,
    name:  String, 
    password:   String,
    friendsIdList: [{ id : Schema.Types.ObjectId }]   
  });

  
 
  export const User: Model<IUser> = model('User', UserSchema);