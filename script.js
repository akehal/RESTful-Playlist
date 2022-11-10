const csv = require('csv-parser'); //parser library
const fs = require('fs'); //filestream library
const albums = []; // albums array
const artists = []; // artists array
const tracks = []; // tracks array
const genres = []; // genres array
const express = require('express');
const app = express();
const port = 3000;
const jsonDB = require('simple-json-db');
const db = new jsonDB('database.json');

// create new list with given name
app.post('/api/playlists/:given_name', (req, res) => {
    const playlistName = req.params.given_name;
    if(!db.has(playlistName)){
        db.set(playlistName, '');
        res.send(`Playlist ${playlistName} has been created`);
    }
    else{
        res.status(404).send(`List ${playlistName} already exists!`);
    }

});

// modify an existing playlist or return error if it doesn't exist
app.put('/api/playlists/:given_name', (req, res) => {
    const playlistName = req.params.given_name;
    const tracklist = req.query.tracklist;
    if(db.has(playlistName)){
        db.set(playlistName, tracklist);
        res.send(`Playlist ${playlistName} has been modified!`)
    }
    else{
        res.status(404).send(`List ${playlistName} does not exist!`);
    }
});

// get list of track IDs within playlist
app.get('/api/playlists/:given_name', (req, res) =>{
    const playlistName = req.params.given_name;
    if(db.has(playlistName)){
        tracklist = db.get(playlistName);
        res.send(`Playlist Track IDs: ${tracklist}`)
    }
    else{
        res.status(404).send(`List ${playlistName} does not exist!`);
    }
});


// delete an existing playlist
app.delete('/api/playlists/:given_name', (req, res) => {
    const listName = req.params.given_name;
    if(db.has(listName)){
        db.delete(listName);
        res.send(`Playlist ${listName} has been deleted`)
    }
    else{
        res.status(404).send(`List ${listName} does not exist!`);
    }
})


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

// get track details by id
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

// get track details by name using given search pattern
app.get('/api/tracknames/:track_title', (req, res) => {
    const title = req.params.track_title;
    const trackname = tracks.filter(t => t.track_title.includes(title));
    console.log(title);
    console.log(trackname);
    if (trackname) {
        res.send(trackname);
    }
    else {
        res.status(404).send(`Track ${title} was not found!`);
    }
});

// get artist details by name using given search pattern
app.get('/api/artistnames/:artist_name', (req, res) => {
    const name = req.params.artist_name;
    const artistname = artists.filter(a => a.artist_name.includes(name));
    console.log(name);
    console.log(artistname);
    if (artistname) {
        res.send(artistname);
    }
    else {
        res.status(404).send(`Artist ${name} was not found!`);
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


