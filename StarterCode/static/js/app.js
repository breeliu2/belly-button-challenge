//store the url in a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//initial function that display, the default 
function init() {

    // dropdown menu to select element
    let dropdownMenu = d3.select("#selDataset");

    // add and popluate samples to dropdown menu
    d3.json(url).then((data) => {
        let sampleNames = data.names;
        sampleNames.forEach((name) => {
            dropdownMenu.append("option")
            .text(name)
            .property("value",name);
        });

        // first item on the list 
        let first = sampleNames[0];

        // display the defualt plots
        metaData(first);
        barChart(first);
        bubbleChart(first);
    });
};

function optionChanged(newSamp) {
    // get the new sample information 
    metaData(newSamp);
    barChart(newSamp);
    bubbleChart(newSamp);
  }

//function to display the demongraphics of each key and value for the matadata 
function metaData(sample) {
    d3.json(url).then((data) => {
        let meta = data.metadata;

        let sampleFilter = meta.filter(obj => obj.id == sample);

        // get the first item
        let samp = sampleFilter[0];

        // make sure it is empty 
        d3.select(".panel-body").html("");

        // Use Object.entries to add the key and value 
        Object.entries(samp).forEach(([key,value]) => {
            d3.select(".panel-body").append("h6").text(`${key}: ${value}`);
        });
    });

};

// function to create and display the bar chart
function barChart(sample) {
    d3.json(url).then((data) => {
        let samples = data.samples;

        // filter based on the value of the sample
        let sampleFilter = samples.filter(obj => obj.id == sample);

        // first item 
        let samp = sampleFilter[0];
        
        // trace top 10 items for bar chart
        let trace = {
            x: samp.sample_values.slice(0,10).reverse(),
            y: samp.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: samp.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };

        traceBar = [trace]

        // plot the bar chart
        Plotly.newPlot("bar", traceBar)
    });
};

function bubbleChart(sample) {
    d3.json(url).then((data) => {
        let samples = data.samples;

        // filter based on the value of the sample
        let sampleFilter = samples.filter(obj => obj.id == sample);

        // first item 
        let samp = sampleFilter[0];

        
        // trace top 10 items for bubble chart
        let trace = {
            x: samp.otu_ids,
            y: samp.sample_values,
            text: samp.otu_labels,
            mode: "markers",
            marker: {
                size: samp.sample_values,
                color: samp.otu_ids,
                colorscale: "YlGnBu"
            }
        };

        traceBubble = [trace]
        // plot the bubble chart
        Plotly.newPlot("bubble", traceBubble)
    });
};


// // Make the gauge chart
// function gauge(sample) {
//     d3.json(url).then((data) => {
//         let metadata = data.metadata;

//         let sampleFilter = metadata.filter((meta) => meta.id == sample);

//         // Assign the first item
//         let samp = sampleFilter[0]

//         // Trace for the data for the gauge chart
//         let trace = [{
//             domain: { x: [0, 1], y: [0, 1] },
//             value: samp.wfreq,
//             title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
//             type: "indicator", 
//             mode: "gauge+number",
//             gauge: {
//                 axis: {range: [null, 10]}, 
//                 bar: {color: "rgb(68,166,198)"},
//                 steps: [
//                     { range: [0, 1], color: "rgb(233,245,248)" },
//                     { range: [1, 2], color: "rgb(218,237,244)" },
//                     { range: [2, 3], color: "rgb(203,230,239)" },
//                     { range: [3, 4], color: "rgb(188,223,235)" },
//                     { range: [4, 5], color: "rgb(173,216,230)" },
//                     { range: [5, 6], color: "rgb(158,209,225)" },
//                     { range: [6, 7], color: "rgb(143,202,221)" },
//                     { range: [7, 8], color: "rgb(128,195,216)" },
//                     { range: [8, 9], color: "rgb(113,187,212)" },
//                     { range: [9, 10], color: "rgb(98,180,207)" }
//                 ]
//             }
//         }];
        
        

//          // Use Plotly to plot the data in a gauge chart
//          Plotly.newPlot("gauge", trace, layout);
//     });
// }

// function optionChanged(newSamp) {
//     demo(sample);
//     bar(sample);
//     bubble(sample);
//     gauge(sample)
// }


init();

