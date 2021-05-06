var queryUrl = '/api/v1/names'

function init() {

    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json(queryUrl).then((data) => {
        var pokeList = data;
        var pokeNames = [];

        for (var i = 0; i < pokeList.length; i++) {
            var pokeID = pokeList[i][0];
            var pokeName = pokeList[i][1];
            pokeNames.push(pokeName + "-" + pokeID);

        }
        var pokeAlpha = pokeNames.sort();
        // console.log(pokeNames);
        // Grab a reference to the dropdown select element


        pokeAlpha.forEach((pokemon) => {
            selector
                .append("option")
                .text(pokemon)
                .property("value", pokemon);
        });

    });
};

d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
    var data = [];
    var values = dataset.split("-");
    var id_part1 = values[0];
    var id_part2 = values[1];
    console.log(id_part2);
};
init();