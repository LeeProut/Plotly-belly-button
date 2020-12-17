function demoBox(choice){   
    console.log(choice);
d3.json("./data/samples.json").then((importedData) => {
    
    //console.log(data);
    var metaData = importedData.metadata;
    console.log(metaData);
    var filterID = metaData.filter(row => row.id == choice);
    console.log(filterID);

    var openArray = filterID[0];
    console.log(openArray);

    //reference to demo box 
    var metaBox = d3.select("#sample-metadata");
    metaBox.html("");

    Object.entries(openArray).forEach(([key, value]) => {
        metaBox.append("h5").text(`${key}: ${value}`);
    });

});
}

function drop(){
// select dropdown menu
var select = d3.select("#selDataset");

d3.json("./data/samples.json").then((importedData) => {
    //console.log(importedData);  
    
    var names = importedData.names;
    
    names.forEach((sample) => {
        select.append("option").text(sample).property("value", sample);
    });

    // First id number
    var newSample = names[0];
    console.log(newSample);
    //call demoBox function
    demoBox(newSample);

});
}

// added this function directly to the html
// function optionChanged(newSample) {
//     demoBox(newSample);
// }



drop();
// horizontal bar graph



// // sort data by sample_values to find top 10 OTUs for selected individual
// var sortedSamples = data.sort((a, b) => b.samples.sample_values - a.samples.sample_values);
// console.log(sortedSamples)

// // find first 10 by slicing
// topSamples = sortedSamples.slice(0, 10);

// var names = Object.values(data.names);



// select.on("change", function() {
//     var value = d3.event.target.value;
//     console.log(value);
//     var
// })

// 

// var trace1 = {
//     x: 
    //    y: 
    //    text: 
    //    name: 
    //    type: "bar",
    //    orientation: "h",
// }