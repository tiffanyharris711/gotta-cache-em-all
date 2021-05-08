var w = 500,
    h = 500;

var colorscale = d3.scale.category10();

//Legend titles
// Can we run a function to Pull Up Pokemon name?

var LegendOptions = ['Pokemon Name'];
// THIS WAS TAKEN FROM LOGIC.JS 
//var queryUrl = '/api/v1/names'
//d3.json(queryUrl)
//.then(data => {
//    console.log(data);
//});

//Data
// NEED TO LOAD FUNCTION THAT CALLS IN POKEMON DATA
// THIS IS A COMMENTED OUT FUNCTION 
// function getPokeBaseStats(PokecharID) {
  //var queryUrl = '/api/v1/base_stats'
  //var filteredData = []
  //var typeList = []
  //

  // d3.json(queryUrl).then(data) => {
    //filteredData.push(data.filter(type => type[0] === testID))

  //}
//}

//function = init () {

//}

// THIS IS Hard Coded Test Data
var d = [
          [
            {axis:"Base Attack",value:100},
            {axis:"Base Defense",value:200},
            {axis:"Base Stamina",value:150},
          ],
        ];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 300,
  levels: 6,
  ExtraWidthX: 300
}

// Draw Radar Graph

RadarChart.draw("#chart", d, mycfg);


// Building the Legend
// Do we need a legend?

var svg = d3.select('#body')
    .selectAll('svg')
    .append('svg')
    .attr("width", w+300)
    .attr("height", h)

// Title of Legend 
var text = svg.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(90,0)') 
    .attr("x", w - 70)
    .attr("y", 10)
    .attr("font-size", "12px")
    .attr("fill", "#404040")
    .text("Pokemon Base Statistics");

// Creates Legend
var legend = svg.append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr('transform', 'translate(90,20)') 
    ;
    // Creates Color Squares for Legend
    legend.selectAll('rect')
      .data(LegendOptions)
      .enter()
      .append("rect")
      .attr("x", w - 65)
      .attr("y", function(data, i){ return i * 20;})
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(data, i){ return colorscale(i);})
      ;
    // Creates Legend Text
    legend.selectAll('text')
      .data(LegendOptions)
      .enter()
      .append("text")
      .attr("x", w - 52)
      .attr("y", function(d, i){ return i * 20 + 9;})
      .attr("font-size", "11px")
      .attr("fill", "#737373")
      .text(function(d) { return d; })
      ; 