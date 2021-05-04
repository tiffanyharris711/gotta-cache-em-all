// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("samples.json").then((data) => {
//     var sampleNames = data.names;

//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     var firstSample = sampleNames[0];
  
//   });
// }

url = "http://127.0.0.1:5000/api/v1/names"

function init() {
  d3.json(url).then((data)=>{
    console.log(data);
  });
}


init();