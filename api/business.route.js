// business.route.js

const express = require('express');
var cors = require('cors');
const businessRoutes = express.Router();
var MongoClient = require('mongodb').MongoClient
// Require Business model in our routes module
let Business = require('./business.model');
let LoginModel = require('./business.login');
let TweetModel = require('./business.tweet');
var app = express()

// respond with "hello world" when a GET request is made to the homepage
// app.get('/login', function (req, res) {
//   res.send(login());
// })


// app.post('localhost:3000/login', cors(), function(req, res){
//   console.log(req.params.username);
// });
// app.use(cors())

// app.get('localhost:3000/login',cors(), function (req, res, next) {
//   console.log(req.params.username);

//   res.json(req.params);
// })
// app.post('/login',cors(),function (req, res, next) {
//   console.log("hello");
//   console.log(req.params.username);
//   res.json(req.params);
// })


// app.post('/login',function(req,res){
//   res.send("hello");
//   console.log("hello");
// });
function runtweet(run){var Twitter = require('twitter');
// var twit = require('ntwitter');
var twit = new Twitter({
   consumer_key: 'cvGH6h2eaRqncfafdx55yYvKO',
   
consumer_secret: 'PGMcK4NNEWIeV75T1WScpBF48Z3H1PvUx8Kpvq8yUDdj6wlniQ',
access_token_key: '822421124474671105-XVIqpR71HGDjFrkkgD6RopdiLmGGzxF',
access_token_secret: '8GrG6bT50cz0lrThfOzvYBWOCcvIjwZShUVSYDol2Ms1G'
});

/**
* Stream statuses filtered by keyword
* number of tweets per second depends on topic popularity
**/
twit.get('search/tweets', {q: run}, function(error, tweets, response) {

tweets.statuses.forEach(element => {
 console.log(element.id);  
 console.log(element.created_at);  
console.log(element.text);    
});
return tweets;

});}

// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

var db_username,db_password,lg_username,lg_password;


businessRoutes.route('/tweet').post(function (req, res) {

 var Twitter = require('twitter');
var twit = new Twitter({
   consumer_key: 'cvGH6h2eaRqncfafdx55yYvKO',
   
consumer_secret: 'PGMcK4NNEWIeV75T1WScpBF48Z3H1PvUx8Kpvq8yUDdj6wlniQ',
access_token_key: '822421124474671105-XVIqpR71HGDjFrkkgD6RopdiLmGGzxF',
access_token_secret: '8GrG6bT50cz0lrThfOzvYBWOCcvIjwZShUVSYDol2Ms1G'
});

twit.get('search/tweets', {q: req.body.username}, function(error, tweets, response) {


  
  tweets.statuses.forEach(element => {console.log(element.created_at);
    let tweetmodel = new TweetModel({"id":element.id,"text":element.text,"created_at":element.created_at});
    tweetmodel.save()
    .then(tweetmodel => {
      res.status(200).json(tweets);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
});
 });
  
  


// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
    Business.find(function(err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});


businessRoutes.route('/login').post(function (req, res) {
try{
  LoginModel.find(function(err, businesses){
    if(err){
      console.log(err);
      
    }
    else {
    //  res.json(businesses);
      db_password=businesses[0].password;
      db_username=businesses[0].username;
      console.log(db_username+" "+db_password);
    }
  });
  
 lg_username=req.body.username;
 lg_password=req.body.password;
 console.log("hello i got it"+req.body.username);
 if(db_username===lg_username&&db_password===lg_password){
  res.json({"status":"success"});
}else
{
  res.json({"status":"failed"});
  
}
  
 }catch(err){}
});





// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      res.status(404).send("data is not found");
    else {
        business.person_name = req.body.person_name;
        business.business_name = req.body.business_name;
        business.business_gst_number = req.body.business_gst_number;

        business.save().then(business => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;
