let mongoose = require('mongoose');
const { Schema } = mongoose;



const dialogSchema = new Schema({
    FirstId:  String, 
    secondId :   String,
    messages : [{ content : String, time: Date , senderId : String }]   
  });


  const DialogModel = mongoose.model("dialogs", dialogSchema);
  module.exports = DialogModel;