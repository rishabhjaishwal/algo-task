const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let LoginModel = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
 
},{
    collection: 'login'
});

module.exports = mongoose.model('LoginModel', LoginModel);