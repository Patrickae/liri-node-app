var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
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

	case ("movie-this"):
		omdbFunc()
		break;

	default: 
		console.log("Invalid command");
};






function twitter(){

	
	var params = {screen_name: 'audevwhite'};

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

function omdbFunc(){

	var movieName = commandTwo;

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

	request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
  
  
  

   // Title of the movie.
   console.log("Title: "+JSON.parse(body).Title); 
   // Year the movie came out.
   console.log("Year: "+JSON.parse(body).Year); 
   // IMDB Rating of the movie.
   console.log("IMDB Rating: "+ JSON.parse(body).imdbRating); 
   // Country where the movie was produced.
   console.log("Country: "+JSON.parse(body).Country); 
   // Language of the movie.
   console.log("Language: "+JSON.parse(body).Language); 
   // Plot of the movie.
   console.log("Plot: "+JSON.parse(body).Plot); 
   // Actors in the movie.
   console.log("Actors: "+JSON.parse(body).Actors);
   // Rotten Tomatoes Rating.
   for(i=0; i<JSON.parse(body).Ratings.length; i++){
   		if(JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes'){
   			console.log("Rotten Tomatoes Score "+JSON.parse(body).Ratings[i].Value);
   		};
   };
   
   // Rotten Tomatoes URL.




  }
});

};






