// Store our API endpoint inside queryUrl
// var queryUrl = "https://pokeapi.co/api/v2/ability/1";

// $.get(queryUrl)
//     .done(data => {
//         console.log(data);
//         // const parseData = JSON.parse(data);
//         console.log(data.effect_entries[1].effect);
//     });

var queryUrl = '/api/v1/names'

function init() {

    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json(queryUrl).then((data) => {
        var pokeList = data;
        var pokeAlpha = pokeList.sort();
        var pokeNames = [];

        for (var i = 0; i < pokeAlpha.length; i++) {

            pokeNames.push(pokeAlpha[i][1]);

        }
        // console.log(pokeNames);
        // Grab a reference to the dropdown select element

        
        pokeNames.forEach((pokemon) => {
            selector
                .append("option")
                .text(pokemon)
                .property("value", pokemon);
        });

    });
};

init();

