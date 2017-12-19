var map = d3.geomap.choropleth()
    .geofile('d3-geomap/topojson/world/countries.json')
	  .colors(['#f4d3b2','#dfba94','#caa076','#b48658','#9f6d3a','#8a531c'])
    .column('2015')
    .domain([-0.1, 1])
    .legend(true)
    .unitId('Country');

d3.select('#map')
				.datum([])
				.call(map.draw, map);

function LoadCountryData(year, indicator){
	if(indicator == ""){
		map.data = [];
		map.update;
	}
	else {
		d3.csv('data/peryear-data/'+year+'.csv', function(error, data) {
			map.column(indicator);
			map.data = data;
			map.update();
		});
	}
}