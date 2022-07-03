// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 90, left: 50 },
  width = 650 - margin.left - margin.right,
  height = 320 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg3 = d3
  .select("#death")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var svg5 = d3
  .select("#compare")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

displayCro();
function displayCro() {
  var dataName = slider.value + ".json";
  svg3.selectAll("g").remove();
  svg5.selectAll("g").remove();

  d3.json(dataName, function (data) {
    data.sort(function (b, a) {
      return a.stanovnistvo - b.stanovnistvo;
    });
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.zupanija;
        })
      )
      .padding(0.2);
    svg3
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    var u = svg3.selectAll("rect").data(data);
    switch (mainValueAttr) {
      case "broj stanovnika":
        var y = d3.scaleLinear().domain([0, 900000]).range([height, 0]);
        svg3.append("g").call(d3.axisLeft(y));
        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          }) // always equal to 0
          .attr("fill", "#344D78");
        var u = svg3.selectAll("rect").data(data);
        u.enter()
          .merge(u)
          .on("click", function (d) {
            console.log(d)
            if (window.selected == "Republika Hrvatska") {
              svg.selectAll("path.county");
              svg.select("path#" + d.id).style("fill", "#344D78");
              window.selected = d.zupanija;
              changeData();
            }
          })
          .on("mouseover", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#1d2b43");
            }
          })
          .on("mouseleave", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#344D78");
            }
          }) // get the already existing elements as well
          .transition() // and apply changes to all of them
          .duration(1000)
          
          .attr("x", function (d) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(d.stanovnistvo);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d.stanovnistvo);
          })
          .attr("fill", "#344D78");
        break;
      case "rodeni":
        var y = d3.scaleLinear().domain([0, 10000]).range([height, 0]);
        svg3.append("g").call(d3.axisLeft(y));

        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .on("click", function (d) {
            console.log(d);
            svg.selectAll("path.county");
            svg.select("path#" + d.id).style("fill", "#344D78");
            window.selected = d.zupanija;
            changeData();
          })
          .attr("x", function (d, i) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          })
          .attr("fill", "#344D78");
        var u = svg3.selectAll("rect").data(data);
        u.enter()
          .merge(u) // get the already existing elements as well
          .on("click", function (d) {
            console.log(d)
            if (window.selected == "Republika Hrvatska") {
              svg.selectAll("path.county");
              svg.select("path#" + d.id).style("fill", "#344D78");
              window.selected = d.zupanija;
              changeData();
            }
          })
          .on("mouseover", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#1d2b43");
            }
          })
          .on("mouseleave", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#344D78");
            }
          })
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", function (d, i) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(d.rodeni);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d.rodeni);
          })
          .attr("fill", "#344D78");
        break;
      case "umrli":
        var y = d3.scaleLinear().domain([0, 10000]).range([height, 0]);

        svg3.append("g").call(d3.axisLeft(y));

        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .on("click", function (d) {
            console.log(d);
            svg.selectAll("path.county");
            svg.select("path#" + d.id).style("fill", "#344D78");
            window.selected = d.zupanija;
            changeData();
          })
          .attr("x", function (d, i) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          })
          .attr("fill", "#344D78");
        var u = svg3.selectAll("rect").data(data);

        u.enter()
          .merge(u) // get the already existing elements as well
          .on("click", function (d) {
            console.log(d)
            if (window.selected == "Republika Hrvatska") {
              svg.selectAll("path.county");
              svg.select("path#" + d.id).style("fill", "#344D78");
              window.selected = d.zupanija;
              changeData();
            }
          })
          .on("mouseover", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#1d2b43");
            }
          })
          .on("mouseleave", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#344D78");
            }
          })
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", function (d, i) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(d.umrli);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d.umrli);
          })
          .attr("fill", "#344D78");
        break;
      case "razvedeni_brak":
        var y = d3.scaleLinear().domain([0, 4000]).range([height, 0]);

        svg3.append("g").call(d3.axisLeft(y));

        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .on("click", function (d) {
            console.log(d);
            svg.selectAll("path.county");
            svg.select("path#" + d.id).style("fill", "#344D78");
            window.selected = d.zupanija;
            changeData();
          })
          .attr("x", function (d, i) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          })
          .attr("fill", "#344D78");

        var u = svg3.selectAll("rect").data(data);

        u.enter()
          .merge(u) // get the already existing elements as well
          .on("click", function (d) {
            console.log(d)
            if (window.selected == "Republika Hrvatska") {
              svg.selectAll("path.county");
              svg.select("path#" + d.id).style("fill", "#344D78");
              window.selected = d.zupanija;
              changeData();
            }
          })
          .on("mouseover", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#1d2b43");
            }
          })
          .on("mouseleave", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#344D78");
            }
          })
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", function (d, i) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(d.razvedeni_brak);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d.razvedeni_brak);
          })
          .attr("fill", "#344D78");

        break;
      default:
        var y = d3.scaleLinear().domain([0, 4000]).range([height, 0]);
        svg3.append("g").call(d3.axisLeft(y));
        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .on("click", function (d) {
            console.log(d);
            svg.selectAll("path.county");
            svg.select("path#" + d.id).style("fill", "#344D78");
            window.selected = d.zupanija;
            changeData();
          })
          .attr("x", function (d, i) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          })
          .attr("fill", "#344D78");
        var u = svg3.selectAll("rect").data(data);

        u.enter()
          .merge(u) // get the already existing elements as well
          .on("click", function (d) {
            console.log(d)
            if (window.selected == "Republika Hrvatska") {
              svg.selectAll("path.county");
              svg.select("path#" + d.id).style("fill", "#344D78");
              window.selected = d.zupanija;
              changeData();
            }
          })
          .on("mouseover", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#1d2b43");
            }
          })
          .on("mouseleave", function (d) {
            if (window.selected == "Republika Hrvatska") {
              d3.select(this).attr("fill", "#344D78");
            }
          })
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", function (d, i) {
            return x(d.zupanija);
          })
          .attr("y", function (d) {
            return y(d.sklopljeni_brak);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d.sklopljeni_brak);
          })
          .attr("fill", "#344D78");
    }
  });
}
