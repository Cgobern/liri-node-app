var fs = require('fs');

// use later when you get to the functio that will need it
// var twitter = require('twitter');
// var request = require('request');
// var spotify = require('spotify');
// Take in the command line arguments
var args = process.argv;
var command = args[2];
var title = args[3];

//Modify search to concatenate strings for songs and movies with multi-word titles
if(process.argv.length >= 4)//this allows any return with more than one word to display in terminal
 {
	for(i = 4; i < args.length; i++) {
		title += '+' + args[i];
	}
}

// Passing in 'command' arguement to get back which function to execute (ex: twitter will callback my tweets)
function commandChoice(){
  switch(command) {
  	//Used to get tweets
  	case 'my-tweets':
  	twitter();
  	break;
  	
  	//Used to get spotify songs
  	case 'spotify-this-song':
  	spotifySong();
  	break;

  	//Used to get movies 
  	case 'movie-this':
  	movie();
  	break;

  	//Used to display whatever command is in the random.txt file 
  	case 'do-what-it-says':
  	liriDoThis();
  	break;
  }
} 
//Twitter
function twitter(){
	//Allows us to use the twitter npm
	var Twitter = require('twitter');
	//requiring the twitter keys
	var keys = require('./keys.js');
	//Gets the tweets from my twitter account(could use any "screen_name" to get that person's tweets)
	var params = {screen_name: 'cortney_gobern'};
	
	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});
	
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for (var i = 0; i < tweets.length; i++) {
  				console.log(tweets[i].text);
  			}
  		}
	});
}

//Spotify
function spotifySong(){
	//Allows us to use the spotify npm
	var spotify = require('spotify');
	//spotify search 
	spotify.search({ type: 'track', query: title || 'ace of base the sign' }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	    	var result = data.tracks.items[0];
    		//ARTIST
    		var artist = result.artists[0].name;
    		console.log("Artist: " + artist);
    		//SONG
    		var song = result.name;
    		console.log("Song: " + song);
    		//PREVIEW
    		var preview = result.preview_url;
    		console.log("Preview link: " + preview);
    		//ALBUM
    		var album = result.album.name;
    		console.log("Album: " + album);
	    }
	});
}

//Movie
function movie(){
	var request = require('request');

	var movieSearch = 'http://www.omdbapi.com/?t=' + title + '&y=&plot=short&tomatoes=true&r=json';
	var nobodyUrl = 'http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&tomatoes=true&r=json';

	if (title != null) {
    	request(movieSearch, function (error, response, body) {	
      		// If the request does not return an error, successful 200
      		if (!error && response.statusCode == 200) {
              	// Parse, get the output
              	console.log(JSON.parse(body));
              	//MOVIE TITLE
              	console.log("Movie Title: " + JSON.parse(body)["Title"]);
              	//YEAR
              	console.log("Year: " + JSON.parse(body)["Year"]);
            	//IMDB
              	console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
              	//COUNTRY
              	console.log("Country of Production: " + JSON.parse(body)["Country"]);
              	//LANGUAGE
              	console.log("Language: " + JSON.parse(body)["Language"]);
              	//PLOT
              	console.log("Plot: " + JSON.parse(body)["Plot"]);
              	//ACTORS
              	console.log("Actors: " + JSON.parse(body)["Actors"]);
              	//ROTTEN TOMATOES RATING
              	console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
              	//ROTTEN TOMATOES URL
              	console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
            };	
      	});
			// if user doesn't enter a title, make title Mr. Nobody
    } else {
      	request(nobodyUrl, function (error, response, body) {
        	// If the request does not return an error, successful 200 
       		if (!error && response.statusCode == 200) {
              	//console.log(JSON.parse(body));
              	//MOVIE TITLE
              	console.log("Movie Title: " + JSON.parse(body)["Title"]);
              	//YEAR
              	console.log("Year: " + JSON.parse(body)["Year"]);
              	//IMDB
              	console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
              	//COUNTRY
              	console.log("Country of Production: " + JSON.parse(body)["Country"]);
              	//LANGUAGE
              	console.log("Language: " + JSON.parse(body)["Language"]);
              	//PLOT
              	console.log("Plot: " + JSON.parse(body)["Plot"]);
              	//ACTORS
              	console.log("Actors: " + JSON.parse(body)["Actors"]);
              	//ROTTEN TOMATOES RATING
              	console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
              	//ROTTEN TOMATOES URL
              	console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
            };
      	});
    }
}

function liriDoThis(){
  fs.readFile('./random.txt','utf-8',function(err,data){
    if(err){
      console.log(err);
    }else{
     var data = data.split(',');
    command = data[0];
    title = data[1];
    }
    commandChoice();
  })
}
commandChoice();