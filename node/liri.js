var Spotify = require('node-spotify-api');
var config = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var info = process.argv.slice(3).join(" ");
var rArtist = "";
var rAlbum = "";
var rSpotLink = "";

function Liri(myCommand, myInfo) {

    if (myCommand === "spotify-this-song") {
        songSearch(myInfo)
    } else if (myCommand === "movie-this") {
        movieSearch(myInfo)
    } else if (myCommand === "do-what-it-says") {
        doWhatItSays()
    } else if (myCommand === "concert-this") {
        concertThis(myInfo)
    };
}
// SPOTIFY


function songSearch(i) {
    spotify.search({
        type: 'track',
        query: i
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var myData = data.tracks.items[0]
        console.log("Song Name: " + myData.name);
        console.log("Artist Name: " + myData.album.artists[0].name)
        // console.log(myData);
        console.log("Album Name: " + myData.album.name);
        console.log("Check out the song here! -> " + myData.external_urls.spotify);

    });
};
// CONCERT SEARCH 

function concertThis(i) {
    var artist = i
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(function (data) {
        console.log("\nArtist: " + artist + "\n");
        for (i = 0; i < 5; i++) {
            console.log("________________________________\n");
            console.log("Venue Name: " + data.data[i].venue.name);
            console.log("City: " + data.data[i].venue.city);
            console.log("State: " + data.data[i].venue.region);
            console.log("Date: " + data.data[i].datetime);
        }

    })
};

// MOVIE SEARCH 

function movieSearch(i) {
    var movieName = i
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            var myData = response.data
            console.log(myData);
            // * Title of the movie.
            console.log(myData.Title);
            // * Year the movie came out.
            console.log("Release Year: " + myData.Year);
            // * IMDB Rating of the movie.
            console.log(myData.imdbRating);
            // * Rotten Tomatoes Rating of the movie.
            console.log(myData.Ratings[1].Value);
            // * Country where the movie was produced.
            console.log(myData.Country);
            // * Language of the movie.
            console.log(myData.Language);
            // * Plot of the movie.
            console.log(myData.Plot);
            // * Actors in the movie.
            console.log(myData.Actors);
        })

};
// DO WHAT IT SAYS 
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        var userCommand = dataArr[0]
        var userInfo = dataArr[1]
        Liri(userCommand, userInfo)
    });
}
Liri(command, info)