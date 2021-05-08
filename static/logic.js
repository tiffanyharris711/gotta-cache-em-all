// Store our API endpoint inside queryUrl
// var queryUrl = "https://pokeapi.co/api/v2/ability/1";

var queryUrl = '/api/v1/names'
d3.json(queryUrl)
    .then(data => {
        console.log(data);
    });