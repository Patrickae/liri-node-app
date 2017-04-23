var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var spotify = require('request');
var twitterKeys = keys.twitterKeys; 
var client = new Twitter(twitterKeys);

var commandOne = process.argv[2];
var commandTwo = process.argv[3];




switch (commandOne){

	case ("my-tweets"):
		twitter()
		break;

	case ("spotify-this-song"):
		spotifyFunc()
		break;

	default: 
		console.log("Invalid command");
};






function twitter(){

	
	var params = {screen_name: 'APatrick12'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
    // console.log(JSON.stringify(tweets, null, 3));

    
    	for (i=0; i< tweets.length; i++){
    		console.log(tweets[i].text);

    		console.log(tweets[i].created_at);
   			 }
		}
	});
};



function spotifyFunc(){

	spotify.search({ type: 'track', query: commandTwo }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	
 	var songObj = data.tracks.items[0];
 	
    // console.log(JSON.stringify(data, null, 3));
    //artist
    console.log(songObj.artists[0].name);
    //song
    console.log(songObj.name);
    //link to song
    console.log(songObj.preview_url);
    //album
 	console.log(songObj.album.name);

});

};







