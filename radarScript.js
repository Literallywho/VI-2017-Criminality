var w =	200,
	h = 200;

var colorscale = d3.scale.category10();

//Legend titles

//Data
var d = [
					[
					{axis:"Theft",value:0.0},
					{axis:"Burglary",value:0.0},
					{axis:"Rape",value:0.0},
					{axis:"Homicide",value:0.0},
					{axis:"GDP",value:0.0},
					{axis:"Unemployment",value:0.0},
					{axis:"Education",value:0.0},
					{axis:"Migration",value:0.0}
					],
					[
					{axis:"Theft",value:0.0},
					{axis:"Burglary",value:0.0},
					{axis:"Rape",value:0.0},
					{axis:"Homicide",value:0.0},
					{axis:"GDP",value:0.0},
					{axis:"Unemployment",value:0.0},
					{axis:"Education",value:0.0},
					{axis:"Migration",value:0.0}
					],
					[
					{axis:"Theft",value:0.0},
					{axis:"Burglary",value:0.0},
					{axis:"Rape",value:0.0},
					{axis:"Homicide",value:0.0},
					{axis:"GDP",value:0.0},
					{axis:"Unemployment",value:0.0},
					{axis:"Education",value:0.0},
					{axis:"Migration",value:0.0}
					],
					[
					{axis:"Theft",value:0.0},
					{axis:"Burglary",value:0.0},
					{axis:"Rape",value:0.0},
					{axis:"Homicide",value:0.0},
					{axis:"GDP",value:0.0},
					{axis:"Unemployment",value:0.0},
					{axis:"Education",value:0.0},
					{axis:"Migration",value:0.0},
					]
				];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 1.0,
  levels: 6,
  ExtraWidthX: 170,
	ExtraWidthY: 70,
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);



function ChangeRadarValues(country, position){
		if(country == '-'){
			d[position-1] = [
				{axis:"Theft",value:0.0},
				{axis:"Burglary",value:0.0},
				{axis:"Rape",value:0.0},
				{axis:"Homicide",value:0.0},
				{axis:"GDP",value:0.0},
				{axis:"Unemployment",value:0.0},
				{axis:"Education",value:0.0},
				{axis:"Migration",value:0.0},
		  ];
			RadarChart.draw('#chart', d, mycfg);
	} else {
		info = parcoords.data().find(function(d){return d.name == country})
		d[position-1] = ConvertToRadar([info])[0];
		RadarChart.draw('#chart', d, mycfg);
	}
}

function ConvertToRadar(infoArray){
	var convertedArray = [];
	var i = 0;
	for(var i = 0;i<infoArray.length;i++){
		var converted = [];
		converted.push({axis:"Theft", value: infoArray[i]['Theft']});
		converted.push({axis:"Burglary", value: infoArray[i]['Burglary']});
		converted.push({axis:"Rape", value: infoArray[i]['Rape']});
		converted.push({axis:"Homicide", value: infoArray[i]['Homicide']});
		converted.push({axis:"GDP", value: infoArray[i]['GDP']});
		converted.push({axis:"Unemployment", value: infoArray[i]['Unemployment']});
		converted.push({axis:"Education", value: infoArray[i]['Education']});
		converted.push({axis:"Migration", value: infoArray[i]['Migration']});
		convertedArray.push(converted);
	}
	return convertedArray;
}

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////
/*
var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("What % of owners use a specific service in a week"); 
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 25)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 12)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	
*/