// use D3 libraries to load the data

const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

    // check the promise
    const dataPromise = d3.json(url);
    console.log('Data Promise: ', dataPromise)

    console.log('test')