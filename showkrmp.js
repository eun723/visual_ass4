$(document).ready(function(){

var placeid = "";
var koreaMapWidth = 0;
var koreaMapHeight = 0;
var initialScale = 4500,
    initialX = 0,
    initialY = 0,
    centered,
    labels;
koreaMapWidth  = initialScale / 6;
koreaMapHeight = initialScale / 6;
initialX = initialScale * -2.15 - 80;
initialY = initialScale * 0.75 - 80;
var mapSvg = d3.select("#mapShow").append("svg")
    .attr("width", koreaMapWidth)
    .attr("height", koreaMapHeight)
    .attr('id', 'koreaMap');
//    .call(zoom);
var koreaProjection, koreaPath, koreaMap,
    placeProjection, placePath, placeMap,
    roadProjection, roadPath, roadMap,
    elecrailProjection, elecrailPath, elecrailMap;
var zoom;

function displayKoreaMap(){
koreaProjection    = d3.geo.mercator().scale(initialScale).translate([initialX, initialY]);
roadProjection     = d3.geo.mercator().scale(initialScale).translate([initialX, initialY]);
koreaPath    = d3.geo.path().projection(koreaProjection);
roadPath     = d3.geo.path().projection(roadProjection);

koreaMap    = mapSvg.append("g").attr("id", "maps");
roadMap     = mapSvg.append("g").attr("id", "road");
elecrailMap = mapSvg.append("g").attr("id", "elecrail");
placeMap    = mapSvg.append("g").attr("id", "places");

zoom = d3.behavior.zoom()
	.center(null)
    .size([koreaMapWidth, koreaMapHeight])
    .scaleExtent([1, 10])
    .on("zoom", function()
     { koreaMap.attr("transform","translate("+ d3.event.translate + ")scale("+d3.event.scale+")");
       roadMap.attr("transform","translate("+ d3.event.translate + ")scale("+d3.event.scale+")");
       });
koreaMap.call(zoom).call(zoom.event);
roadMap.call(zoom).call(zoom.event);

d3.json("./korea.json", function(json)
{ koreaMap.selectAll("path")
          .data(json.features).enter().append("path")
          .attr("d", koreaPath)
          .attr("id", function(d) { return 'path-'+d.properties.code; });
});

d3.json("./koreaexpresswaylines.geojson", function(json)
{ roadMap.selectAll("path")
          .data(json.features).enter().append("path")
          .attr("d", roadPath);
});



}

displayKoreaMap();

});
