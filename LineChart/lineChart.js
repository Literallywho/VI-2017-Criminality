  linechart = d3.select("#lineChart");

	
  //height = linechart[0][0].clientHeight - margin.top - margin.bottom;

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50} //width = 500 
    var height = 200
		var width = linechart[0][0].clientWidth - margin.left - margin.right;

	
// Parse the date / time
var parseDate = d3.time.format("%b %Y").parse;

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var noFormat = d3.format("04d");
// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(7).tickFormat(function(a) {return noFormat(a)});

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var priceline = d3.svg.line()	
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Value); });
    
// Adds the svg canvas
var svg = d3.select("#lineChart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");
function deleteLineChart(){
	svg.selectAll('path').remove();
	svg.selectAll('g').remove();
}
function drawLinechart(data){
		data.forEach(function(d) {
			d.Year = d.Year;
			d.Value = +d.Value;
    });
		
		xdomain = d3.extent(data, function(d) { return d.Year; });

    // Scale the range of the data
    x.domain(xdomain);
    y.domain([0, d3.max(data, function(d) { return d.Value; })]);

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.Country;})
        .entries(data);

    var color = d3.scale.category10();   // set the colour scale

    //legendSpace = width/dataNest.length; // spacing for the legend

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 

        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign ID
            .attr("d", priceline(d.values));

        // Add the Legend
        /*svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
            .attr("y", height + (margin.bottom/2)+ 5)
            .attr("class", "legend")    // style the legend
            .style("fill", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .on("click", function(){
                // Determine if current line is visible 
                var active   = d.active ? false : true,
                newOpacity = active ? 0 : 1; 
                // Hide or show the elements based on the ID
                d3.select("#tag"+d.key.replace(/\s+/g, ''))
                    .transition().duration(100) 
                    .style("opacity", newOpacity); 
                // Update whether or not the elements are active
                d.active = active;
                })  
            .text(d.key); */

    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}

// Get the data
function LoadLineChart(chartName, selectedCountries){
	d3.csv("data/lineChart_data/"+chartName+".csv", function(error, data) {
		deleteLineChart();
		var lcData = [];
		var abc = ['A', 'B', 'C', 'D'];
		for (var j = 0; j < selectedCountries.length; j++)
		{
			var newdata;
			if(typeof data == 'undefined'){
				newdata = [{Country: abc[j], Year: "2003", Value: "0.0"}, {Country: abc[j], Year: "2015", Value: "0.0"}];
			} else {
				newdata = data.reduce(function(a, e, i) {
					if (e.Country == selectedCountries[j])
							a.push(e);
					return a;
				}, []);
				if(newdata.length == 0){
					newdata = [{Country: abc[j], Year: "2003", Value: "0.0"}, {Country: abc[j], Year: "2015", Value: "0.0"}]
				}
			}
			lcData = lcData.concat(newdata);
		}
		drawLinechart(lcData);
	});
}