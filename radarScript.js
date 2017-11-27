var w =	200,
	h = 200;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Portugal','Inglaterra'];

//Data
var d = [
		  [
			{axis:"Theft",value:0.75},
			{axis:"Burglary",value:0.437},
			{axis:"Rape",value:0.542},
			{axis:"Homicide",value:0.419},
			{axis:"GDP",value:0.458},
			{axis:"Unemployment",value:0.634},
			{axis:"Education Index",value:0.465},
			{axis:"Migration",value:0.404},
		  ],[
			{axis:"Theft",value:0.929},
			{axis:"Burglary",value:0.829},
			{axis:"Rape",value:0.584},
			{axis:"Homicide",value:0.544},
			{axis:"GDP",value:0.527},
			{axis:"Unemployment",value:0.278},
			{axis:"Education Index",value:0.676},
			{axis:"Migration",value:1.0},
		  ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 160
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
/*var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("What % of owners use a specific service in a week"); */
		
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
