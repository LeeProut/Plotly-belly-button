// function for pulling info from json to populate demo box
function demoBox(choice){   
    console.log(choice);
// read in the data from the json file    
d3.json("./data/samples.json").then((importedData) => {
    
    //console.log(data);
    // filtering for any subject's id number and retrieving the data connected to the id
    // set variable for the data
    var metaData = importedData.metadata;
    console.log(metaData);
    // set variable for filtering any ID number 
    var filterID = metaData.filter(row => row.id == choice);
    console.log(filterID);

    // set variable for filtering for any ID, passing in the first index
    var openArray = filterID[0];
    console.log(openArray);

    // reference to demo box where the data will be listed
    var metaBox = d3.select("#sample-metadata");
    metaBox.html("");

    // loop through data to extract the key and value pairs to append to the demo box
    Object.entries(openArray).forEach(([key, value]) => {
        metaBox.append("h5").text(`${key}: ${value}`);
    });

});
}

// function for selecting an id from the dropdown menu
function drop(){
// select dropdown menu
var select = d3.select("#selDataset");

// read in the data from the json file
d3.json("./data/samples.json").then((importedData) => {
    console.log(importedData);  
    
    // set variable for retrieving the "names" array (list of ids) from the data
    var names = importedData.names;
    
    names.forEach((sample) => {
        select.append("option").text(sample).property("value", sample);
    });

    // First id number
    var newSample = names[0];
    console.log(newSample);

    //call demoBox function to read in the new value selected from the dropdown
    demoBox(newSample);

});
}

// added this function directly to the html
// when the user selects a new id in the dropdown, call the data for that id
// function optionChanged(newSample) {
//     demoBox(newSample);
// }

// call the drop function to read in the new value selected from the dropdown
// then return the demoBox function to render the selected data in the demographic info element on the page
drop();


// horizontal bar graph

// read in the data from the json file
d3.json("./data/samples.json").then((importedData) => {
    console.log(importedData);  

// set variable for retrieving the "samples" array from the data    
var samplesArray = importedData.samples[0];
console.log(samplesArray);

// set variable for retrieving the sample_values for Each id in the sample array
var sampleValues = samplesArray.sample_values;
console.log(sampleValues);

// set variable for retrieving the otu_ids for Each id in the sample array
var otuIDs = samplesArray.otu_ids; 
console.log(otuIDs);

// set variable for retrieving the otu_labels for Each id in the sample array
var otuLabels = samplesArray.otu_labels;
console.log(otuLabels);


// sort data by sample_values to find top 10 OTUs for selected individual
var sortedSamples = sampleValues.sort((a, b) => b.sample_values - a.sample_values);
console.log(sortedSamples)

// sort data by otu_ids to find top 10 OTU IDs for selected individual
var sortedOTUids = otuIDs.sort((a, b) => b.otu_ids - a.otu_ids); 
console.log(sortedOTUids);

// sort data by otu_labels to find top 10 OTU labels for selected individual
var sortedOTUlabels = otuLabels.sort((a, b) => b.otu_labels - a.otu_labels);
console.log(sortedOTUlabels);

//forEach id, sort the sample_values and return the top 10 sample_values

// var sortedSamples = samples.sort(function(a, b) {
//     return b.sample_values - a.sample_values;
// });
// console.log(sortedSamples);

// find first 10 by slicing
var topSamples = sortedSamples.slice(0, 10).reverse();
console.log(topSamples);

var topOTUids = sortedOTUids.slice(0, 10).reverse(); 
console.log(topOTUids);

var topOTUlabels = sortedOTUlabels.slice(0, 10).reverse();
console.log(topOTUlabels);


// select.on("change", function() {
//     var value = d3.event.target.value;
//     console.log(value);
//     var
// })

// 

var trace1 = {
    x: topSamples,
    y: topOTUids.map(id => `OTU ${id}`),
    text: topOTUlabels,
    type: "bar",
    orientation: "h",
};

var bellyData = [trace1];

var layout = {
    title: "Top 10 Microbial Species Present",
};

// Render the plot to the div tag with id "bar"
Plotly.newPlot("bar", bellyData, layout);

});