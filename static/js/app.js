// function for pulling info from json to populate demo box
function demoBox(choice){   

// read in the data from the json file    
d3.json("./data/samples.json").then((importedData) => {
    
    // filtering for any subject's id number and retrieving the data connected to the id
    // set variable for the data
    var metaData = importedData.metadata;
    
    // set variable for filtering any ID number 
    var filterID = metaData.filter(row => row.id == choice);

    // set variable for filtering for any ID, passing in the first index
    var openArray = filterID[0];

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
    // console.log(importedData);  
    
    // set variable for retrieving the "names" array (list of ids) from the data
    var names = importedData.names;
    
    names.forEach((sample) => {
        select.append("option").text(sample).property("value", sample);
    });

    // First id number
    var newSample = names[0];
    // console.log(newSample);

    //call functions to read in the new value selected from the dropdown
    demoBox(newSample);
    hBar(newSample);
    bChart(newSample);

});
}

// call the drop function to read in the new value selected from the dropdown and update each visualization
drop();

// when the user selects a new id in the dropdown, call the data for that id
function optionChanged(newSample) {
    demoBox(newSample);
    hBar(newSample);
    bChart(newSample);
};


// horizontal bar graph

// read in the data from the json file
function hBar(choice){d3.json("./data/samples.json").then((importedData) => {
    console.log(importedData);  

// set variable for the samples array data 
var allSamples = importedData.samples;

// set variable for filtering any ID number 
var filterIDsamples = allSamples.filter(row => row.id == choice);
console.log(filterIDsamples);

// set variable for filtering for any ID, passing in the first index  
var samplesArray = filterIDsamples[0];

// set variable for retrieving the sample_values for Each id in the sample array
var sampleValues = samplesArray.sample_values;

// set variable for retrieving the otu_ids for Each id in the sample array
var otuIDs = samplesArray.otu_ids; 

// set variable for retrieving the otu_labels for Each id in the sample array
var otuLabels = samplesArray.otu_labels;

// sort data by sample_values to find top 10 OTUs for selected individual
var sortedSamples = sampleValues.sort((a, b) => b.sample_values - a.sample_values);

// sort data by otu_ids to find top 10 OTU IDs for selected individual
var sortedOTUids = otuIDs.sort((a, b) => b.otu_ids - a.otu_ids); 

// sort data by otu_labels to find top 10 OTU labels for selected individual
var sortedOTUlabels = otuLabels.sort((a, b) => b.otu_labels - a.otu_labels);

// find first 10 by slicing, reverse order for hbar 
var topSamples = sortedSamples.slice(0, 10).reverse();

var topOTUids = sortedOTUids.slice(0, 10).reverse(); 

var topOTUlabels = sortedOTUlabels.slice(0, 10).reverse();

// create labels for y axis, making an array with .map and adding "OTU" to the otu_ids values for each id number
var hbarOTUids = topOTUids.map(id => `OTU ${id}`);

// set the trace1 variable for the hbar 
var trace1 = {
    x: topSamples,
    y: hbarOTUids,
    text: topOTUlabels,
    type: "bar",
    orientation: "h",
};

// set a variable for trace1
var bellyData = [trace1];

//set variable for layout
var layout = {
    margin: (l=300, r=300, t=100, b=100),
    title: `<b>Top 10 Microbial Species Present<br> for Test Subject ${choice}</b>`,
};

// Render the plot to the div tag with id "bar"
Plotly.newPlot("bar", bellyData, layout);

//adding hBar function to the optionChanged function above to respond to user input (newSample)
});
};

// bubble chart 

function bChart(choice){d3.json("./data/samples.json").then((importedData) => {
    console.log(importedData);  

// set variable for the samples array data 
var allSamples = importedData.samples;

// set variable for filtering any ID number 
var filterIDsamples = allSamples.filter(row => row.id == choice);
console.log(filterIDsamples);

// set variable for filtering for any ID, passing in the first index  
var samplesArray = filterIDsamples[0];

// set variable for retrieving the sample_values for Each id in the sample array
var sampleValues = samplesArray.sample_values;

// set variable for retrieving the otu_ids for Each id in the sample array
var otuIDs = samplesArray.otu_ids; 

// set variable for retrieving the otu_labels for Each id in the sample array
var otuLabels = samplesArray.otu_labels;
console.log(otuLabels);

// set the trace2 variable for the bubble chart
var trace2 = {
    x: otuIDs,
    y: sampleValues,
    mode: "markers",
    marker: {
        size: sampleValues,
        color: otuIDs,    
    },
    text: otuLabels,
    type: "scatter",
};

var bellyBubble = [trace2];

//set variable for layout
var layout = {
    title: `<b>All Microbial Species Present for Test Subject ${choice}</b>`,
    showlegend: false,
    height: 600,
    width: 1200,
    xaxis: {
        title: {
            text: "OTU ID",
        }
    }
};

// Render the plot to the div tag with id "bubble"
Plotly.newPlot("bubble", bellyBubble, layout);

//adding bChart function to the optionChanged function above to respond to user input (newSample)
});
};





