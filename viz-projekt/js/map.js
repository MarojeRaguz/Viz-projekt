var selected = "Republika Hrvatska";
var width = 800;
var height = 660;
var projection = d3.geoMercator()
    .center([0, 10])
    .scale(6000)
    .translate([17500, 4480])
    .rotate([-180, 0]);
var path = d3.geoPath().projection(projection);
var svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#EDDFDF")
    .style("margin-right", "20px")
    .style("padding", "10px")
    .style("position", "sticky")
    .append("g");
var g = svg.append("g");
d3.json("data.json", function (error, cro) {
    var data = topojson.feature(cro, cro.objects.layer1);
    var states = svg
        .selectAll("path.county")
        .data(data.features)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", path)
        .attr("d", path)
        .style("fill", "#DA1717")
        .style("stroke", "gray")
        .style("stroke-width", 1)
        .style("stroke-opacity", 1)
        .on("mouseover", function (d) {
            if (window.selected != d.properties.name) {
                svg.select("path#" + d.id)
                    .style("fill", "gray")
            }

        })
        .on("mouseleave", function (d) {

            if (window.selected != d.properties.name) {
                svg.select("path#" + d.id)
                    .style("fill", "#DA1717")
            }
        })
        .on("click", function (d) {

            if (window.selected != d.properties.name) {
                console.log(d.id + "is this")
                svg
                    .selectAll("path.county")
                    .style("fill", "#DA1717")
                svg.select("path#" + d.id)
                    .style("fill", "#344D78")
                window.selected = d.properties.name
            } else {
                svg
                    .selectAll("path.county")
                    .style("fill", "#DA1717")
                window.selected = "Republika Hrvatska"
            }
            changeData();
        });
});