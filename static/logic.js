// Store our API endpoint inside queryUrl
// var queryUrl = "https://pokeapi.co/api/v2/ability/1";

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

//--------------get character image from API--------------//
function getCharImage(pokecharID) {
  var charImageStubURL = "https://pokeres.bastionbot.org/images/pokemon/";
  var charImageURL = charImageStubURL + pokecharID + ".png";

  d3.select("#character-image")
    .append("img")
    .attr("src", charImageURL)
    .attr("width", "40%")
    .attr("id", "char-image");
  }

//--------------get character description from API--------------//
function getCharDesc(pokecharID) {
  var charDescStubURL = "https://pokeapi.co/api/v2/ability/";
  var charDescURL = charDescStubURL + pokecharID;

  d3.json(charDescURL)
    .then((data) => {
      var charDesc = data.effect_entries[1].effect;
      d3.select("#character-description")
        .append("div")
        .attr("id", "char-desc")
        .append("p")
        .text(charDesc);
    })
    .catch(function (error) {
      var charDesc = "No description found for this Pokemon character.";
      d3.select("#character-description")
        .append("div")
        .attr("id", "char-desc")
        .append("p")
        .text(charDesc);
    });
}

//--------------get character type from API--------------//
function getCharType(pokecharID) {
  var queryUrl = "/api/v1/types";
  var int_pokeCharID = parseInt(pokecharID);
  let filteredData = [];
  let typeList = [];
  var textColor = "navy";
  var fillColor = "white";
  typeList.length = 0;

  d3.json(queryUrl).then((data) => {
    filteredData.push(data.filter((type) => type[0] === int_pokeCharID));

    filteredData[0].forEach((pokemon) => {
      typeList.push(pokemon[1]);
    });

    typeList.forEach((type) => {
      switch (type) {
        case "Bug":
          fillColor = "lightpink";
          break;
        case "Dark":
          fillColor = "indigo";
          textColor = "white";
          break;
        case "Dragon":
          fillColor = "green";
          break;
        case "Electric":
          fillColor = "greenyellow";
          break;
        case "Grass":
          fillColor = "lightgreen";
          break;
        case "Ice":
          fillColor = "lightblue";
          break;
        case "Fairy":
          fillColor = "orchid";
          break;
        case "Fighting":
          fillColor = "indianred";
          break;
        case "Fire":
          fillColor = "orange";
          break;
        case "Flying":
          fillColor = "goldenrod";
          break;
        case "Normal":
          fillColor = "yellow";
          break;
        case "Psychic":
          fillColor = "magenta";
          break;
        case "Rock":
          fillColor = "lightsalmon";
          textColor = "white";
          break;
        case "Steel":
          fillColor = "silver";
          break;
        case "Water":
          fillColor = "mediumturquoise";
          break;
        default:
          fillColor = "red";
          textColor = "white";
          break;
      }

      d3.select("#character-type")
        .append("div")
        .attr("id", "char-type")
        .append("h4")
        .attr("class", "col-md-6 row")
        .text(type)
        .style("background-color", fillColor)
        .style("color", textColor);
    });
  });
}

//--------------get character moves from API--------------//
function getCharMoves(pokecharID) {
  var queryUrl = "/api/v1/fast_moves";
  var int_pokeCharID = parseInt(pokecharID);

  let filteredMoves = [];
  let moveList = [];
  moveList.length = 0;
  var x = 0;

  d3.json(queryUrl).then((data) => {
    filteredMoves.push(data.filter((move) => move[0] === int_pokeCharID));

    filteredMoves[0].forEach((pokemon) => {
      moveList.push(pokemon[1]);
    });

    moveList.forEach((move) => {
      //----alternate fill colors with every other row, use modulus operator to determine even/odd----//
      x = x + 1;

      switch (x % 2) {
        case 0:
          fillColor = "springgreen";
          textColor = "navy";
          break;
        default:
          fillColor = "yellow";
          textColor = "navy";
          break;
      }

      //----append character moves-----//
      d3.select("#character-moves")
        .append("h4")
        .attr("id", "char-move")
        .attr("class", "col-md-6 row")
        .text(move)
        .style("background-color", fillColor)
        .style("color", textColor);
    });
  });
}

//--------------build radar graph with character base stats--------------//

function getBaseStats(pokecharID) {
  var queryUrl = "/api/v1/base_stats";
  var int_pokeCharID = parseInt(pokecharID);

  let filteredStats = [];
  let statsList = [];
  statsList.length = 0;

  d3.json(queryUrl).then((data) => {
    filteredStats.push(
      data.filter((stat) => stat[0] === int_pokeCharID && stat[1] === "Normal")
    );

    var base_attack = filteredStats[0][0][2];
    var base_defense = filteredStats[0][0][3];
    var base_stamina = filteredStats[0][0][4];

    var w = 500,
      h = 500;

    var colorscale = d3.scaleOrdinal(d3.schemeCategory10);

    var d = [
      [
        { axis: "Base Attack", value: base_attack },
        { axis: "Base Defense", value: base_defense },
        { axis: "Base Stamina", value: base_stamina },
      ],
    ];

    //Options for the Radar chart, other than default
    var mycfg = {
      w: w,
      h: h,
      maxValue: 300,
      levels: 6,
      ExtraWidthX: 300,
    };

    // Draw Radar Graph

    RadarChart.draw("#chart", d, mycfg);
  });
} //end graph

//--------------clears the page and resets when the user chooses a different character--------------//
function optionChanged(pokecharID) {
  var dropdownMenu = d3.select("#selDataset");
  var pokechar_nameID = dropdownMenu.property("value");
  var values = pokechar_nameID.split("-");
  var pokecharID = values[1];

  //remove previous selection before rebuilding page
  var img = d3.select("#char-image");
  img.remove();

  var p = d3.select("#char-desc");
  p.remove();

  var type = d3.selectAll("#char-type");
  type.remove();

  var move = d3.selectAll("#char-move");
  move.remove();

  //update character image to match new selection
  getCharImage(pokecharID);
  getCharDesc(pokecharID);
  getCharType(pokecharID);
  getCharMoves(pokecharID);
  getBaseStats(pokecharID);
}

//--------------initial function to load the webpage, called at the very end--------------//
function init() {
  var queryUrl = "/api/v1/description";
  var selector = d3.select("#selDataset");

  selector.html("");

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

    var firstID = 63;
    getCharDesc(firstID);
    getCharImage(firstID);
    getCharType(firstID);
    getCharMoves(firstID);
    getBaseStats(firstID);
  });
}

//call initial function to build webpage
init();