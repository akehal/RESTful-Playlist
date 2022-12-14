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
const Joi = require('joi');

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

// get list of list names, number of tracks on each list, and total play time of each list
app.get('/api/playlists', (req, res) =>{
    objectArray = [];
    playlistNames = Object.keys(db.JSON());
    for(const name of playlistNames){
        var durationSum = 0; // sum of duration in seconds
        trackIDsArray = db.get(name).split(',');        
        numberOfTracks = trackIDsArray.length;
        if(db.get(name) == '' ){
            numberOfTracks = 0;
        }
        for(const id of trackIDsArray){
            track = tracks.find(t => parseInt(t.track_id) === parseInt(id))
            if(track){ // some tracks are undefined, so checking to make sure it exists
                duration = track.track_duration.split(':');
                durationSum += parseInt(duration[0])*60 + parseInt(duration[1]);
            }
        }
        objectArray.push({playlistName: name, numberOfTracks: numberOfTracks, playlistDuration: durationSum/60 + " minutes"} );
    }
    res.send(objectArray);
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

// get album details
app.get('/api/albumnames/:album_title', (req, res) => {
    // Input sanitation
    const schema = Joi.object({
    album_title: Joi.string().required()
    });
    const result = schema.validate(req.params);
        if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
}
    const title = req.params.album_title;
    const albumname = albums.filter(a => a.album_title.includes(title));
    const albumreal = [];
    for(i = 0; i<20;i++){
        albumreal.push(albumname[i]);
    }
    console.log(title);
    console.log(albumreal);
    if (albumreal) {
        res.send(albumreal);
    }
    else {
        res.status(404).send(`Album ${title} was not found!`);
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
        // Input sanitation
        const schema = Joi.object({
            track_title: Joi.string().required()
            });
            const result = schema.validate(req.params);
                if (result.error) {
            res.status(400).json(result.error.details[0].message);
            return;
        }
    const title = req.params.track_title;
    const trackname = tracks.filter(t => t.track_title.includes(title));
    const trackreal = [];
    for(i = 0; i<20;i++){
        trackreal.push(trackname[i]);
    }
    console.log(title);
    console.log(trackreal);
    if (trackreal) {
        res.send(trackreal);
    }
    else {
        res.status(404).send(`Track ${title} was not found!`);
    }
});

// get artist details by name using given search pattern
app.get('/api/artistnames/:artist_name', (req, res) => {
        // Input sanitation
        const schema = Joi.object({
            artist_name: Joi.string().required()
            });
            const result = schema.validate(req.params);
                if (result.error) {
            res.status(400).json(result.error.details[0].message);
            return;
        }
    const name = req.params.artist_name;
    const artistname = artists.filter(a => a.artist_name.includes(name));
    const artistreal = [];
    for(i = 0; i<20;i++){
        artistreal.push(artistname[i]);
    }
    console.log(name);
    console.log(artistreal);
    if (artistreal) {
        res.send(artistreal);
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