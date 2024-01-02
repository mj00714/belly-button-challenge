// store the url for use across all functions
url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// build the function to build the charts
function buildCharts(sample) {
    // use D3 to fetch the data from the provided URL
    d3.json(url).then((data) => {
      // filter the data for the object with the desired sample number
      let samples = data.samples;
      let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
  
      // get the data for the charts
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;
  
      // build the bar chart
      let barData = [{
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h'
      }];
  
      let barLayout = {
        title: "Top 10 Bacteria Cultures for Subject ID",
        margin: { t: 75, l: 150, b: 50 },
        paper_bgcolor: 'rgba(255, 255, 255, .7)'
      };
  
      Plotly.newPlot("bar", barData, barLayout);
  
      // build the bubble chart
      let bubbleData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Portland"
        }
      }];
  
      let bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 100 },
        paper_bgcolor: 'rgba(255, 255, 255, .7)'
      };
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
  }
  
  // function to display the metadata section
  function showMetadata(sample) {
    d3.json(url).then((data) => {
      let metadata = data.metadata;
      let result = metadata.filter(meta => meta.id.toString() === sample)[0];
      let metadataPanel = d3.select("#sample-metadata");
  
      // clear existing metadata
      metadataPanel.html("");
  
      // add the key-value pairs to the metadata table
      Object.entries(result).forEach(([key, value]) => {
        metadataPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }
  
  // function to change event when a new sample is selected
  function optionChanged(newSample) {
    buildCharts(newSample);
    showMetadata(newSample);
  }
  
  // initialize the dashboard
  function init() {
    let selector = d3.select("#selDataset");
  
    // populate the selected options
    d3.json(url).then((data) => {
      let sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // use the first sample to initialize the dashboard
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      showMetadata(firstSample);
    });
  }
  
  // initialize the dashboard on page load
  init();