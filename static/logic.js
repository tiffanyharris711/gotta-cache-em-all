// var queryUrl = "https://pokeapi.co/api/v2/ability/1";

var queryUrl = "/api/v1/names";

function init() {
  var selector = d3.select("#selDataset");

  d3.json(queryUrl).then((data) => {
    var pokeList = data;
    var pokeAlpha = pokeList.sort();
    var pokeNames = [];

    for (var i = 0; i < pokeAlpha.length; i++) {
      var pokeID = pokeAlpha[i][0];
      var pokeName = pokeAlpha[i][1];
      pokeNames.push(pokeName + "-" + pokeID);
    }

    pokeNames.sort();

    pokeNames.forEach((pokemon) => {
      selector.append("option").text(pokemon).property("value", pokemon);
    });
  });
}

d3.selectAll("#selDataset").on("change", getData);

function getData() {
  var dropdownMenu = d3.select("#selDataset");
  var pokechar_nameID = dropdownMenu.property("value");
  var data = [];
  var values = pokechar_nameID.split("-");
  var pokecharName = values[0];
  var pokecharID = values[1];
  console.log(pokecharID);
  // console.log(dataset);

  //--------------get character description from API--------------//

  var charDescStubURL = "https://pokeapi.co/api/v2/ability/";
  var charDescURL = charDescStubURL + pokecharID;

  d3.json(charDescURL).then((data) => {
    var charDesc = data.effect_entries[1].effect;
    console.log(charDesc);
  })
  .catch(function(error){
    var charDesc = "No description found for this Pokemon character."  
    console.log(error);
  });


  //--------------get character image from API--------------//

  var charImageStubURL = "https://pokeres.bastionbot.org/images/pokemon/";
  var charImageURL = charImageStubURL + pokecharID + '.png';
//   console.log(charImageURL);
  d3.select("#character-image")
    .append('img')
    .attr('src', charImageURL)
    .attr('alt',' ')

}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // charDescription();
}

init();
