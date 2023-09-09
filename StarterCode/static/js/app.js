const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Get data from URL
const dataUrl = d3.json(url);
dataUrl.then(function(data) 
    {
    console.log(data);
    });

// dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    let names =[];
    let samples =[];
    let metaData =[];
    let demographicInfo = d3.select("#sample-metadata");
    //Get data splitted
    dataUrl.then((data)=>{
        names=data['names'];
        samples=data['samples'];
        metaData=data['metadata'];
        names.forEach(element => {
            dropdownMenu.append('option').text(element).property('value',element);            
        });
        metaDataTag(metaData[0]);
        barChart(samples[0]);
 
    });
    


function optionChanged(idSelected)
    {
    let dataSampleSelected = samples.find((item)=>item.id == idSelected);
    let metaDataSelected = metaData.find((item)=>item.id == idSelected);
    metaDataTag(metaDataSelected);
    barChart(dataSampleSelected);
    };


function metaDataTag(metaDataSelected)
        {
        demographicInfo.html(
            `
            id: ${metaDataSelected['id']}<br>
            ethnicity: ${metaDataSelected['ethnicity']}<br>
            gender: ${metaDataSelected['gender']}<br>
            age: ${metaDataSelected['age']}<br>
            location: ${metaDataSelected['location']}<br>
            bbtype: ${metaDataSelected['bbtype']}<br>
            wfreq: ${metaDataSelected['wfreq']}<br>            
            `
                );
        };         

function barChart(dataSampleSelected)
{
    let axis_x = dataSampleSelected['sample_values'].slice(0,10).reverse();
    let axis_y = dataSampleSelected['otu_ids'].slice(0,10).reverse().map((item)=>'OTU '+item);
    let label =dataSampleSelected['otu_labels'].slice(0,10).reverse();
    
    trace = {
        x:axis_x,
        y:axis_y,
        text:label,
        type:'bar',
        orientation: 'h',
            };
    
    let dataBarChart = [trace];
    
    let layout = {
    // Include margins in the layout so the x-tick labels display correctly
        margin: 
        {
        l: 100,
        r: 100,
        b: 200,
        t: 50,
        },
        height:700,
        width:800,
                };
    Plotly.newPlot("bar", dataBarChart, layout);

}