import { strict } from "assert/strict";

let mongoose = require('mongoose');
const { Schema } = mongoose;

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'fcc-Mail';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(error => {
         console.error('Database connection error')
       })
  }
}

const userSchema = new Schema({
    name:  String, 
    password:   String,
    friendsIdList: [{ id : String }]   
  });

  const dialogSchema = new Schema({
    FirstId:  String, 
    secondId :   String,
    messages : [{ content : String, time: Date , senderId : String }]   
  });



module.exports = new Database()