const csv = require('csv-parser'); //parser library
const fs = require('fs'); //filestream library
const albums = []; // albums array
const artists = []; // artists array
const tracks = []; // tracks array
const genres = []; // genres array
const express = require('express');
const app = express();
const port = 3000;

// setup serving front-end using express static
app.use('/', express.static('static'));

// setting up middleware to do logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
})

// parse data in JSON
app.use(express.json());


// get genre details
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:genre_id', (req, res) => {
    const id = req.params.genre_id;
    const genre = genres.find(g => parseInt(g.genre_id) === parseInt(id));
    if (genre) {
        res.send(genre);
    }
    else {
        res.status(404).send(`Genre ${id} was not found!`);
    }
});

// get artist details
app.get('/api/artists', (req, res) => {
    res.send(artists);
});

app.get('/api/artists/:artist_id', (req, res) => {
    const id = req.params.artist_id;
    const artist = artists.find(a => parseInt(a.artist_id) === parseInt(id));
    if (artist) {
        res.send(artist);
    }
    else {
        res.status(404).send(`Artist ${id} was not found!`);
    }
});

// get track details
app.get('/api/tracks', (req, res) => {
    res.send(tracks);
});

app.get('/api/tracks/:track_id', (req, res) => {
    const id = req.params.track_id;
    const track = tracks.find(t => parseInt(t.track_id) === parseInt(id));
    if (track) {
        res.send(track);
    }
    else {
        res.status(404).send(`Track ${id} was not found!`);
    }
});

// listen to port 3000 on localhost
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

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


