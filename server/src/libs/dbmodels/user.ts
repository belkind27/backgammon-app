import { strict } from "assert/strict";

let mongoose = require('mongoose');
const { Schema } = mongoose;

//const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
//const database = 'BackgammonDB';      // REPLACE WITH YOUR DB NAME

const dbURI = 'mongodb+srv://gameguy:gameguy100@cluster0.f6bsm.mongodb.net/BackgammonDB?retryWrites=true&w=majority'

/*
class Database {
  constructor() {
    this._connect()
  }
  
  // connecting to DB

  
_connect() {
     mongoose.connect(dbURI , { useNewUrlParser : true , useUnifiedTopology : true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
*/

const userSchema = new Schema({
    name:  String, 
    password:   String,
    friendsIdList: [{ id : String }]   
  });

  
  const UserModel = mongoose.model("Users", userSchema);
  module.exports = UserModel;


// module.exports = new Database()