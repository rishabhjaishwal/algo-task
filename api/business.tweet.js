const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let TweetModel = new Schema({
  id: {
    type: String
  },
  text: {
    type: String
  },
  created_at: {
    type: String
  }
 
 
},{
    collection: 'tweets'
});

module.exports = mongoose.model('TweetModel', TweetModel);