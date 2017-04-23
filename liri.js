var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var twitterKeys = keys.twitterKeys; 
var client = new Twitter(twitterKeys);


var params = {screen_name: 'nodejs'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});