var Spotify = require('node-spotify-api');
var config = require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2]
var info = process.argv[3]
var rArtist = ""
var rAlbum = ""
var rSpotLink = ""

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
}
songSearch("Black Widow")