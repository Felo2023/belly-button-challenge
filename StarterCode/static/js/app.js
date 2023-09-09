const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Get data from URL
const dataUrl = d3.json(url);
dataUrl.then(function(data) {
    console.log(data);
  });

// dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    //Get data splitted
    dataUrl.then((data)=>{
        let names=data['names'];
        let samples=data['samples'];
        let metaData=data['metadata'];
        names.forEach(element => {
            dropdownMenu.append('option').text(element).property('value',element);            
        });
    });

