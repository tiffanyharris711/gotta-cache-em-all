var w = 500,
    h = 500;

var colorscale = d3.scale.category10();

//Legend titles
// Can we run a function to Pull Up Pokemon name?

var LegendOptions = ['Pokemon Name'];

//Data
// NEED TO LOAD FUNCTION THAT CALLS IN POKEMON DATA
//var queryUrl = '/api/v1/base_stats'
//function = init () {

//}


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

//Call function to draw the Radar chart
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
    .selectAll('svg')
    .append('svg')
    .attr("width", w+300)
    .attr("height", h)

//Create the title for the legend
var text = svg.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(90,0)') 
    .attr("x", w - 70)
    .attr("y", 10)
    .attr("font-size", "12px")
    .attr("fill", "#404040")
    .text("Pokemon Base Statistics");

//Initiate Legend   
var legend = svg.append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr('transform', 'translate(90,20)') 
    ;
    //Create colour squares
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
    //Create text next to squares
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