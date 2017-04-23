var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var twitterKeys = keys.twitterKeys; 
var client = new Twitter(twitterKeys);
var commandOne = process.argv[2];
var commandTwo = process.argv[3];
var thisObj = new Object();




function switchCommand(){
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

		case ("do-what-it-says"):
			whatItSays()
			break;


		default: 
			console.log("Invalid command");
	};
};



function appendLog(){

	fs.appendFile("log.txt",","+JSON.stringify(thisObj, null, 3), function(err) {
			if (err) {
			    console.log(err);
			  }else{
				console.log("Content Added!");
			};
	    });
};




function twitter(){

	
	var params = {screen_name: 'audevwhite'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {

	    	var tweetArray =[];
	    
	    	for (i=0; i< tweets.length; i++){
	    		//create a new object
		    		var tweetObj = new Object();
		    		//add the text and time to the objet
		    		console.log(tweets[i].text);
		    		tweetObj.text = tweets[i].text;

		    		console.log(tweets[i].created_at);
		    		tweetObj.time_created = tweets[i].created_at;
		    		//add obj to tweets array
		    		
		    		tweetArray[i] = tweetObj;

	   			 };
	   			 //add tweets array to the object
	   			 thisObj.tweets = tweetArray;

		   		appendLog();
		}
	});
};







function spotifyFunc(){

	spotify.search({ type: 'track', query: commandTwo }, function(err, data) {
   		 if ( err ) {
    	    console.log('Error occurred: ');
      		  return;
   		 };

	 	var songObj = data.tracks.items[0];

	 	if(songObj===undefined){

	 		commandTwo = "0hrBpAOgrt8RXigk83LLNE";
	 		spotify.lookup({ type:'track', id: commandTwo }, function(err, data) {
	

	 			console.log("*Artist: "+data.artists[0].name);
	 			thisObj.artist = data.artists[0].name;
	 			console.log("*Song: "+data.name);
	 			thisObj.song = data.name;
	 			console.log("*Preview URL: "+data.preview_url);
	 			thisObj.preview = data.preview_url
	 			console.log("*Album: "+data.album.name);
	 			thisObj.album = data.album.name;
	 			appendLog();
	 		});

	 	}else{
	 	
		   
		    //artist
		    console.log("*Artist: "+songObj.artists[0].name);
		    thisObj.artist = songObj.artists[0].name;
		    //song
		    console.log("*Song: "+songObj.name);
		    thisObj.song = songObj.name;
		    //link to song
		    console.log("*Preview URL: "+songObj.preview_url);
		    songPreview = songObj.preview_url;
		    
		    //album
		 	console.log("*Album: "+songObj.album.name);
		 	thisObj.album = songObj.album.name;
		 	appendLog();
		 	preview();
	 	};

	});
};









function omdbFunc(){

	var movieName = commandTwo;

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

	request(queryUrl, function(error, response, body) {

	 	 if (!error && response.statusCode === 200) { 

			   // Title of the movie.
			   console.log("*Title: "+JSON.parse(body).Title); 
			   thisObj.title = JSON.parse(body).Title;
			   // Year the movie came out.
			   console.log("*Year: "+JSON.parse(body).Year); 
			   thisObj.year = JSON.parse(body).Year;
			   // IMDB Rating of the movie.
			   console.log("*IMDB Rating: "+ JSON.parse(body).imdbRating);
			   thisObj.imdbRating = JSON.parse(body).imdbRating; 
			   // Country where the movie was produced.
			   console.log("*Country: "+JSON.parse(body).Country); 
			   thisObj.country = JSON.parse(body).Country;
			   // Language of the movie.
			   console.log("*Language: "+JSON.parse(body).Language); 
			   thisObj.language = JSON.parse(body).Language;
			   // Plot of the movie.
			   console.log("*Plot: "+JSON.parse(body).Plot); 
			   thisObj.plot = JSON.parse(body).Plot;
			   // Actors in the movie.
			   console.log("*Actors: "+JSON.parse(body).Actors);
			   thisObj.actors = JSON.parse(body).Actors;
			   // Rotten Tomatoes Rating.
			   for(i=0; i<JSON.parse(body).Ratings.length; i++){
			   		if(JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes'){
			   			console.log("*Rotten Tomatoes Score "+JSON.parse(body).Ratings[i].Value);
			   			thisObj.rottenTomatoesScore = JSON.parse(body).Ratings[i].Value;
			   		};
			   };			   

			 appendLog();

	  		};
	});
};




function whatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){

		  // Then split it by commas (to make it more readable)
		  var dataArr = data.split(",");

		  // We will then re-display the content as an array for later use.
		  console.log(dataArr);

		 commandOne = dataArr[0];
		 commandTwo = dataArr[1];

		 switchCommand();

		 
	});

};



switchCommand();

var songPreview = "";
function preview(){
	var open = require("open");
	if (commandTwo === '"never gonna give you up"'){
		 		open(songPreview);
		 	};
};





