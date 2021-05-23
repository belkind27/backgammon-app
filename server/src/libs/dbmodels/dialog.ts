import mongoose, { Schema, Document } from 'mongoose';



const dialogSchema = new Schema({
    id : Schema.Types.ObjectId,
    FirstId:  String, 
    secondId :   String,
    messages : [{ content : String, time: Date , senderId : Schema.Types.ObjectId }]   
  });

/*
  const DialogModel = mongoose.model("dialogs", dialogSchema);
  module.exports = DialogModel; */
  export default mongoose.model('Dialog', dialogSchema);