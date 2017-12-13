var map = d3.geomap.choropleth()
    .geofile('d3-geomap/topojson/world/countries.json')
	.colors(['#f4d3b2','#dfba94','#caa076','#b48658','#9f6d3a','#8a531c'])
    .column('2015')
    .domain([0, 5000])
    .legend(true)
    .unitId('Country');

d3.csv('data/Countries.csv', function(error, data) {
    d3.select('#map')
        .datum(data)
        .call(map.draw, map);
});