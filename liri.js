// get the twitter credentials
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var twr = require('./keys');
var consumerKey = twr.twitterKeys.consumer_key;
var consumerSecret = twr.twitterKeys.consumer_secret;
var accessKey = twr.twitterKeys.access_token_key;
var accessSecret = twr.twitterKeys.access_token_secret;
//get the input from command line
var feature = process.argv[2];
var name = process.argv[3];

var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessKey,
  access_token_secret: accessSecret
});

// case 1 - twitter app
tweets = function(){
	
	client.get('favorites/list',function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	    for(var i = 0; i < tweets.length; i++){
	    	console.log(i + 1);
	    	console.log(tweets[i].text);
	    	console.log(tweets[i].created_at);
	    }
	  }
	});
}


// case 2 - spotify app

var spotify = function(song){
	spotify.search({ type: 'track', query: 'Frozen' }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    else{
	    	console.log(data);
	    	//var song = data.tracks.items[0];
    		//var songOutput = console.log(song.artists[0].name)
            //         console.log(song.name)
             //        console.log(song.preview_url)
             //        console.log(song.album.name)
               
   			 //console.log(songOutput);
   		}
	});

}

// case 3, movie app


var movie = function(name){
	var queryUrl = "http://www.omdbapi.com/?t=" + name + "&apiKey=40e9cece&y=&plot=short&r=json";
	console.log(queryUrl);
	request(queryUrl, function(err,response,body){
	if( !err ){
		if ( response.statusCode ===  200){
			var responseObject = JSON.parse(body);
			var movieInfo = console.log("Movie title: " + responseObject.Title)
							console.log("Year came out: " + responseObject.Year)
							console.log("IMDB rating: " + responseObject.imdbRating)
							console.log("Country where movie was produced: " + responseObject.Country)
							console.log("Language of the movie: " + responseObject.Language)
							console.log("Plot of the movie: " + responseObject.Plot)
							console.log("Actors in the movie: " + responseObject.Actors)
							console.log("Rotten Tomatoes URL: " + responseObject.Website)

			console.log(movieInfo);
		}
	}
	else {
		console.log("Your request failed");
	}
});

}

if( feature === "do-what-it-says")
{
	fs.readFile('random.txt', 'utf8', function(error,data){
		if(error){

		}
		else
		{
			var text = data.split(",");
			console.log(text);
			console.log(text[0]);
			feature = text[0];
			name = text[1];
			switch(feature){
				case "my-tweets":
				tweets();
				break;

				case "spotify-this-song":
				spotify(name);
				break;

				case "movie-this":
				movie(name);
				break;

			}
			
		}
	});
}

switch(feature){
	case "my-tweets":
	tweets();
	break;

	case "spotify-this-song":
	spotify(name);
	break;

	case "movie-this":
	movie(name);
	break;

}
