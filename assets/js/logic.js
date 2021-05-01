// Store our API endpoint inside queryUrl
var queryUrl = "https://pokeapi.co/api/v2/ability/1";

$.get(queryUrl)
    .done(data => {
        console.log(data);
        // const parseData = JSON.parse(data);
        console.log(data.effect_entries[1].effect);
    });