var fs = require('fs');

// Take in the command line arguments
var nodeArgs = process.argv;
var command = nodeArgs[2];
var title = nodeArgs[3];

//Modify search to concatenate strings for songs and movies with multi-word titles
if(process.argv.length >= 4)//this allows any return with more than one word to display in terminal
 {
	for(i = 4; i < nodeArgs.length; i++) {
		title += '+' + nodeArgs[i];
	}
}

//console.log(title);

//Switches for the different commands
switch(command) {
	case 'my-tweets':
		myTwitter();
	break;

	case 'spotify-this-song':
		spotifySearch();
	break;

	case 'movie-this':
		movieSearch();
		break;

	case 'do-what-it-says':
		doThis();
	break;

	default:
	break;
}

	//TWITTER FEED
	function myTwitter() {
		//require npm package
    	var Twitter = require('twitter');
    	//Get twitter keys them
		var keys = require('./keys.js');
		//Search for my twitter handle
    	var params = {screen_name: 'DrJcode'};
    	//console.log(params);
    	var client = new Twitter({
      		consumer_key: keys.twitterKeys.consumer_key,
      		consumer_secret: keys.twitterKeys.consumer_secret,
      		access_token_key: keys.twitterKeys.access_token_key,
      		access_token_secret: keys.twitterKeys.access_token_secret
    	}); 
    	//console.log(client);
    	client.get('statuses/user_timeline', params, function(error, tweets, response) {
      		if (!error) {
        		for (var i = 0; i < tweets.length; i++) {
          		console.log(tweets[i].text);   
        		}
      		}
    	});
    }

	//SPOTIFY SEARCH
	function spotifySearch () {
		//require npm package
		var spotify = require('spotify');	
		spotify.search({ type: 'track', query: title || 'ace of base the sign' }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	} else {
    		// Do something with 'data' 
    		//console.log(JSON.stringify(data, null, 2));
    		//console.log(data);
    		//console.log("First result" + data.tracks.items[0]);
    		var spotifyResult = data.tracks.items[0];
    		//ARTIST
    		var artist = spotifyResult.artists[0].name;
    		console.log("Artist: " + artist);
    		//SONG
    		var song = spotifyResult.name;
    		console.log("Song: " + song);
    		//PREVIEW
    		var preview = spotifyResult.preview_url;
    		console.log("Preview link: " + preview);
    		//ALBUM
    		var album = spotifyResult.album.name;
    		console.log("Album: " + album);
    	}
		});
	}

	//MOVIE SEARCH
	function movieSearch () {
		//npm package
		var request = require('request');
		//
		var movieUrl = 'http://www.omdbapi.com/?t=' + title + '&y=&plot=short&tomatoes=true&r=json';
		var nobodyUrl = 'http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&tomatoes=true&r=json';
		//console.log(movieUrl);
		//If the user enters a title
		if (title != null) {
    		request(movieUrl, function (error, response, body) {	
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

  	//DO WHAT IT SAYS
  	function doThis (){
  		//require spotify to search for song in text file
  		var spotify = require('spotify');
  		fs.readFile("random.txt", "utf8", function(error, data) {
  			//console.log(data);
        //remove quotation marks
  			randomString = data.replace(/["]+/g,'');
  			//split on comma
      	randomSplit = randomString.split(",");
      	console.log(randomSplit);
        var stringTitle = randomSplit[1].trim(' ');
        console.log(stringTitle);
        //first split the title into an array of words
        var arrayTitle = stringTitle.split(" ");
        console.log(arrayTitle);
        //concatenate title
        for(i = 0; i < arrayTitle.length; i++) {
          title += '+' + arrayTitle[i];
        }
        console.log(title);
        spotifySearch();
    	});
    	
  	}