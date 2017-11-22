// quantitative color scale
var blue_to_brown = d3.scale.linear()
  .domain([9, 50])
  .range(["steelblue", "brown"])
  .interpolate(d3.interpolateLab);
  
var zcolorscale = d3.scale.linear()
  .domain([-1,-0.5,0.5,1])
  .range(["brown", "#999", "#999", "steelblue"])
  .interpolate(d3.interpolateLab);


var parcoords = d3.parcoords()("#example")
    .alpha(0.4);
	
var dragflag = 0;

// load csv file and create the chart
d3.csv('data/cars.csv', function(data) {
  parcoords
    .data(data)
    .hideAxis(["name"])
    .composite("darker")
    .render()
    .shadows()
    .reorderable()
    .brushMode("1D-axes");  // enable brushing
	
  change_color("weight (lb)");

  // click label to activate coloring
  parcoords.svg.selectAll(".dimension")
	.on('mousedown', function(){ dragflag = 0; })
	.on('mousemove', function(){ dragflag = 1; })
	.on('mouseup', function(e) { if(dragflag === 0) change_color(e); })
    //.on("click", change_color)	
    .selectAll(".label")
    .style("font-size", "14px");
});

// update color
function change_color(dimension) {
  parcoords.svg.selectAll(".dimension")
    .style("font-weight", "normal")
    .filter(function(d) { return d == dimension; })
    .style("font-weight", "bold")

  parcoords.color(zcolor(parcoords.data(),dimension)).render();
  var highlighted = parcoords.highlighted();
  if(highlighted.length > 0){
	setTimeout(function(){ parcoords.highlight(highlighted); }, 1);
  }
}

// return color function based on plot and dimension
function zcolor(col, dimension) {
  var z = zscore(_(col).pluck(dimension).map(parseFloat))
  return function(d) { return zcolorscale(z(d[dimension])) }
};

// color by zscore
function zscore(col) {
  var n = col.length,
      mean = _(col).mean(),
      sigma = _(col).stdDeviation();
  return function(d) {
    return (d-mean)/sigma;
  };
};

var sltBrushMode = d3.select('#sltBrushMode')

sltBrushMode.selectAll('option')
  .data(parcoords.brushModes())
  .enter()
    .append('option')
    .text(function(d) { return d; });

sltBrushMode.on('change', function() {
  parcoords.brushMode(this.value);
  switch(this.value) {
  case 'None':
    d3.select("#pStrums").style("visibility", "hidden");
    d3.select("#lblPredicate").style("visibility", "hidden");
    d3.select("#sltPredicate").style("visibility", "hidden");
    d3.select("#btnReset").style("visibility", "hidden");
    break;
  case '2D-strums':
    d3.select("#pStrums").style("visibility", "visible");
    break;
  default:
    d3.select("#pStrums").style("visibility", "hidden");
    d3.select("#lblPredicate").style("visibility", "visible");
    d3.select("#sltPredicate").style("visibility", "visible");
    d3.select("#btnReset").style("visibility", "visible");
    break;
  }
});

sltBrushMode.property('value', '1D-axes');

d3.select('#btnReset').on('click', function() {parcoords.brushReset();})
d3.select('#sltPredicate').on('change', function() {
  parcoords.brushPredicate(this.value);
});

parcoords.highlightedColors(['green', 'red', 'orange', 'purple']);
/*parcoords.highlight([{
  "name": "AMC Ambassador DPL",
  "economy (mpg)": "15",
  "cylinders": "8",
  "displacement (cc)": "390",
  "power (hp)": "190",
  "weight (lb)": "3850",
  "0-60 mph (s)": "8.5"
}]);*/