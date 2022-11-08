const csv = require('csv-parser'); //parser library
const fs = require('fs'); //filestream library
const albums = []; // albums array
const artists = []; // artists array
const tracks = []; // tracks array
const genres = []; // genres array

//parses and stores albums information in the array 
fs.createReadStream('raw_albums.csv')
    .pipe(csv({}))
    .on('data', (data) => albums.push(data))
    .on('end', () => {
        //console.log(albums)
    });

//parses and stores artists information in the array
fs.createReadStream('raw_artists.csv')
    .pipe(csv({}))
    .on('data', (data) => artists.push(data))
    .on('end', () => {
        //console.log(artists)
    });

//parses and stores tracks information in the array
fs.createReadStream('raw_tracks.csv')
    .pipe(csv({}))
    .on('data', (data) => tracks.push(data))
    .on('end', () => {
        //console.log(tracks)
    });

//parses and stores genres information in the array
fs.createReadStream('genres.csv')
    .pipe(csv({}))
    .on('data', (data) => genres.push(data))
    .on('end', () => {
        //console.log(genres)
    });


