var RadarChart = {
	update: function(id, d, options){
	
	var series=0;
	var g = d3.select(id)	
		var cfg = {
		 radius: 5,
		 w: 600,
		 h: 600,
		 factor: 1,
		 factorLegend: .85,
		 levels: 3,
		 maxValue: 0,
		 radians: 2 * Math.PI,
		 opacityArea: 0.5,
		 ToRight: 5,
		 TranslateX: 80,
		 TranslateY: 30,
		 ExtraWidthX: 100,
		 ExtraWidthY: 100,
		 color: d3.scale.category10().domain(d3.range(0,10))
		};
	
		if('undefined' !== typeof options){
			for(var i in options){
			if('undefined' !== typeof options[i]){
				cfg[i] = options[i];
			}
			}
		}
		
		var allAxis = (d[0].map(function(i, j){return i.axis}));
		var total = allAxis.length;
		d.forEach(function(y, x){
			dataValues = [];
			pos=[];
			g.selectAll(".nodes")
			.data(y, function(j, i){
				dataValues.push([
				cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total + 0.39)), 
				cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total + 0.39))
				]);
				pos.push(j);
			});
			dataValues.push(dataValues[0]);
			
			var str="";
			var drewCircles = true; 
			for(var i = 0; i<dataValues.length; i++){
				str=str+dataValues[i][0]+","+dataValues[i][1]+" ";
				if(i > 7 || g.selectAll('svg').selectAll('circle.radar-chart-serie'+series+'.circle'+i)[0].length>0){
					g.selectAll('svg').selectAll('circle.radar-chart-serie'+series+'.circle'+i).transition(""+series+""+i).duration(1000).attr('cx', function(){return dataValues[i][0];}).attr('cy', function(){return dataValues[i][1]});
				} else {
					drewCircles = false;
				}
			}
			dur = 1000;
			if(!drewCircles){
				g.selectAll('svg').selectAll('circle.radar-chart-serie'+series).remove()
				CreateCircle(0, pos, series, g.selectAll('svg>g'), cfg, total);
				dur = 0;
			}
			
			g.selectAll('svg').selectAll(".radar-chart-serie"+series).transition(series).duration(dur)
						.attr("points", str);
			series++;
		});
			series=0;


			
	},
  draw: function(id, d, options){
  var cfg = {
	 radius: 5,
	 w: 600,
	 h: 600,
	 factor: 1,
	 factorLegend: .85,
	 levels: 3,
	 maxValue: 0,
	 radians: 2 * Math.PI,
	 opacityArea: 0.5,
	 ToRight: 5,
	 TranslateX: 80,
	 TranslateY: 30,
	 ExtraWidthX: 100,
	 ExtraWidthY: 100,
	 color: d3.scale.category10()
	};
	
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){
		  cfg[i] = options[i];
		}
	  }
	}
	cfg.maxValue = cfg.maxValue;  //Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	var allAxis = (d[0].map(function(i, j){return i.axis}));
	var total = allAxis.length;
	var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
	var Format = d3.format('%');
	d3.select(id).select("svg").remove();
	
		var g = d3.select(id)
			.append("svg")
			.attr("width", cfg.w+cfg.ExtraWidthX)
			.attr("height", cfg.h+cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
			;

	var tooltip;
	
	//Circular segments
	for(var j=0; j<cfg.levels; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data(allAxis)
	   .enter()
	   .append("svg:line")
	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total + 0.39));})
	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total + 0.39));})
	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total + 0.39));})
	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total + 0.39));})
	   .attr("class", "line")
	   .style("stroke", "grey")
	   .style("stroke-opacity", "0.75")
	   .style("stroke-width", "0.3px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
	}

	//Text indicating at what % each level is
	for(var j=0; j<cfg.levels; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data([1]) //dummy data
	   .enter()
	   .append("svg:text")
	   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
	   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
	   .attr("class", "legend")
	   .style("font-family", "sans-serif")
	   .style("font-size", "10px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + ((cfg.h/2-levelFactor)*Math.cos(0.39)+15) + ")")
	   .attr("fill", "#737373")
	   .text(Format((j+1)*cfg.maxValue/cfg.levels));
	}
	
	series = 0;

	var axis = g.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

	axis.append("line")
		.attr("x1", cfg.w/2)
		.attr("y1", cfg.h/2)
		.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total + 0.39));})
		.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total + 0.39));})
		.attr("class", "line")
		.style("stroke", "grey")
		.style("stroke-width", "1px");

	axis.append("text")
		.attr("class", "legend")
		.text(function(d){return d})
		.style("font-family", "sans-serif")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "1.5em")
		.attr("transform", function(d, i){return "translate(0, -10)"})
		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total + 0.39))-60*Math.sin(i*cfg.radians/total + 0.39);})
		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total + 0.39))-20*Math.cos(i*cfg.radians/total + 0.39);});


 
	d.forEach(function(y, x){
	  dataValues = [];
	  g.selectAll(".nodes")
		.data(y, function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total + 0.39)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total + 0.39))
		  ]);
		});
	  dataValues.push(dataValues[0]);
	  g.selectAll(".area")
					 .data([dataValues])
					 .enter()
					 .append("polygon")
					 .attr("class", "radar-chart-serie"+series)
					 .style("stroke-width", "2px")
					 .style("stroke", cfg.color(series))
					 .attr("points",function(d) {
						 var str="";
							 for(var pti=0;pti<d.length;pti++){
								 str=str+d[pti][0]+","+d[pti][1]+" ";
							 }
						 return str;
					  })
					 .style("fill", function(j, i){return cfg.color(series)})
					 .style("fill-opacity", cfg.opacityArea)
					 .on('mouseover', function (d){
										z = "polygon."+d3.select(this).attr("class");
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", 0.1); 
										g.selectAll(z)
										 .transition(200)
										 .style("fill-opacity", .7);
									  })
					 .on('mouseout', function(){
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", cfg.opacityArea);
					 });
	  series++;
	});
	series=0;


	d.forEach(function(y, x){
		CreateCircle(x, y, series, g, cfg, total);
	  series++;
	});
	//Tooltip
	tooltip = g.append('text')
			   .style('opacity', 0)
			   .style('font-family', 'sans-serif')
			   .style('font-size', '13px');
  }
};

function CreateCircle(x, y, series, g, cfg, total){
		if(y[0]['value'] == y[1]['value'] && y[0]['value'] == y[2]['value'] && y[0]['value'] == y[3]['value'] && y[0]['value'] == y[4]['value'] &&y[0]['value'] == y[5]['value'] &&y[0]['value'] == y[6]['value'] &&y[0]['value'] == y[7]['value'] && y[0]['value'] == 0)
		{
			
		}
		else
		{
			circleNum = -1;
			g.selectAll(".nodes")
			.data(y).enter()
			.append("svg:circle")
			.attr("class", function(){circleNum = circleNum+1; return "radar-chart-serie"+series+" circle"+circleNum})
			.attr('r', cfg.radius)
			.attr("alt", function(j){return Math.max(j.value, 0)})
			.attr("cx", function(j, i){
				dataValues.push([
				cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total + 0.39)), 
				cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total + 0.39))
			]);
			return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total + 0.39));
			})
			.attr("cy", function(j, i){
				return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total + 0.39));
			})
			.attr("data-id", function(j){return j.axis})
			.style("fill", cfg.color(series)).style("fill-opacity", .9)
			.on('mouseover', function (d){
						newX =  parseFloat(d3.select(this).attr('cx')) - 10;
						newY =  parseFloat(d3.select(this).attr('cy')) - 5;
					
						tooltip
							.attr('x', newX)
							.attr('y', newY)
							.text(Format(d.value))
							.transition(200)
							.style('opacity', 1);
						
						z = "polygon."+d3.select(this).attr("class");
						g.selectAll("polygon")
							.transition(200)
							.style("fill-opacity", 0.1); 
						g.selectAll(z)
							.transition(200)
							.style("fill-opacity", .7);
						})
			.on('mouseout', function(){
						tooltip
							.transition(200)
							.style('opacity', 0);
						g.selectAll("polygon")
							.transition(200)
							.style("fill-opacity", cfg.opacityArea);
						})
			.append("svg:title")
			.text(function(j){return Math.max(j.value, 0)});
		}
}