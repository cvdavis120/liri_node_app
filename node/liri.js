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

        // console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
        console.log(data.tracks.items[0].album.artists[0].name)
        rArtist = data.tracks.items[0].album.artists[0].name

    });
}