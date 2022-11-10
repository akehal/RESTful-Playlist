// adds event listener for searching for an artist
const artistForm = document.getElementById("artist-search");
artistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const artistName = document.getElementById("artist-search-input").value;

    fetch("http://" + window.location.host + "/api/artistnames/" + artistName, {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(httpResp => {
            return httpResp.json().then(data => {
                // Clears current data
                let table = document.getElementById("table");
                table.textContent = "";
                if (httpResp.ok) {

                    // Appends Data
                    for (let artist of data) {
                        table.appendChild(createArtistTableRow(artist));
                    }
                }
                else {
                    throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                }
            })
        })
        .catch(err => {
            alert(err);
        })
});

const albumForm = document.getElementById("album-search");
artistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const albumName = document.getElementById("album-search-input").value;

    fetch("http://" + window.location.host + "/api/artistnames/" + artistName, {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(httpResp => {
            return httpResp.json().then(data => {
                // Clears current data
                let table = document.getElementById("table");
                table.textContent = "";
                if (httpResp.ok) {

                    // Appends Data
                    for (let artist of data) {
                        table.appendChild(createArtistTableRow(artist));
                    }
                }
                else {
                    throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                }
            })
        })
        .catch(err => {
            alert(err);
        })
});

function createTrackTableRow(track) {
    let tableRow = document.createElement("tableRow");

    // adds artist id
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_id));
    tableRow.appendChild(tableData);

    // adds artist name
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_name));
    tableRow.appendChild(tableData);

    // adds artist location
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_location));
    tableRow.appendChild(tableData);

    // adds artist favorites
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_favorites));
    tableRow.appendChild(tableData);

    // adds artist contact
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_contact));
    tableRow.appendChild(tableData);

    // adds artist website
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_website));
    tableRow.appendChild(tableData);

    return tableRow;
}

function createAlbumTableRow(album) {
    let tableRow = document.createElement("tableRow");

    // adds album id
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(album.album_id));
    tableRow.appendChild(tableData);

    // adds album name
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(album.album_title));
    tableRow.appendChild(tableData);

    // adds album date creation
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(album.album_date_created));
    tableRow.appendChild(tableData);

    // adds album date released
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(album.album_date_released));
    tableRow.appendChild(tableData);

    // adds album favourites
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(album.album_favorites));
    tableRow.appendChild(tableData);

    // adds album listens
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(album.album_listens));
    tableRow.appendChild(tableData);

    return tableRow;
}

function createArtistTableRow(artist) {
    let tableRow = document.createElement("tableRow");

    // adds artist id
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_id));
    tableRow.appendChild(tableData);

    // adds artist name
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_name));
    tableRow.appendChild(tableData);

    // adds artist location
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_location));
    tableRow.appendChild(tableData);

    // adds artist favorites
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_favorites));
    tableRow.appendChild(tableData);

    // adds artist contact
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_contact));
    tableRow.appendChild(tableData);

    // adds artist website
    tableData = document.createElement("tableData");
    tableData.appendChild(document.createTextNode(artist.artist_website));
    tableRow.appendChild(tableData);

    return tableRow;
}


