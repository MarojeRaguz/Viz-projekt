function displayCountry() {
  svg3.selectAll("g").remove();
  svg5.selectAll("*").remove();

  var countryArray = [];
  var countryCompare = document.getElementById("compare2");
  var countryCompareName =
    countryCompare.options[countryCompare.selectedIndex].text;
  var countryCompareArray = [];
  var years = [2017, 2018, 2019, 2020, 2021];

  for (let index = 2017; index < 2022; index++) {
    var dataName = index + ".json";

    jQuery.ajax({
      dataType: "json",
      url: dataName,
      async: false,
      success: function (data) {
        countryArray.push(
          data.filter(function (item) {
            return item.zupanija == selected;
          })
        );
        countryCompareArray.push(
          data.filter(function (item) {
            return item.zupanija == countryCompareName;
          })
        );
      },
    });
  }

  const data = JSON.parse(JSON.stringify(countryArray));
  const compareData = JSON.parse(JSON.stringify(countryCompareArray));
  console.log(data);
  console.log(compareData);
  countryCharts(data);

  function countryCharts(data) {
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain([2017, 2018, 2019, 2020, 2021])
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
        var y = d3
          .scaleLinear()
          .domain([0, Math.max(data[0][0].stanovnistvo) * 1.2])
          .range([height, 0]);
        svg3.append("g").call(d3.axisLeft(y));
        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          })
          .attr("fill", "#344D78");
        u.enter()
          .merge(u) // get the already existing elements as well
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].stanovnistvo);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d[0].stanovnistvo);
          })
          .attr("fill", "#344D78");
        u.exit().remove();
        break;
      case "rodeni":
        var y = d3
          .scaleLinear()
          .domain([
            0,
            data[0][0].umrli * 1.2
          ])
          .range([height, 0]);
        svg3.append("g").call(d3.axisLeft(y));

        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          })
          .attr("fill", "#344D78");
        u.enter()
          .merge(u) // get the already existing elements as well
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].rodeni);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d[0].rodeni);
          })
          .attr("fill", "#344D78");
        u.exit().remove();
        break;
      case "umrli":
        var y = d3
          .scaleLinear()
          .domain([
            0,
            data[0][0].umrli * 1.2
          ])
          .range([height, 0]);

        svg3.append("g").call(d3.axisLeft(y));

        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          })
          .attr("fill", "#344D78");
        u.enter()
          .merge(u) // get the already existing elements as well
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].umrli);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d[0].umrli);
          })
          .attr("fill", "#344D78");
        u.exit().remove();
        break;
      case "razvedeni_brak":
        var y = d3
          .scaleLinear()
          .domain([
            0,
            
              data[1][0].sklopljeni_brak
               * 1.2
          ])
          .range([height, 0]);

        svg3.append("g").call(d3.axisLeft(y));

        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          })
          .attr("fill", "#344D78");
        u.enter()
          .merge(u) // get the already existing elements as well
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].razvedeni_brak);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d[0].razvedeni_brak);
          })
          .attr("fill", "#344D78");
        u.exit().remove();
        break;
      default:
        var y = d3
          .scaleLinear()
          .domain([
            0,
            
              data[0][0].sklopljeni_brak
             * 1.2
          ])
          .range([height, 0]);
        svg3.append("g").call(d3.axisLeft(y));
        // Bars
        svg3
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(0);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(0);
          })
          .attr("fill", "#344D78");
        u.enter()
          .merge(u) // get the already existing elements as well
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].sklopljeni_brak);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d[0].sklopljeni_brak);
          })
          .attr("fill", "#344D78");
        u.exit().remove();
    }

    //pocetak treveg

    var x = d3
      .scaleBand()
      .range([0, width])
      .domain([2017, 2018, 2019, 2020, 2021])
      .padding(0.2);
    svg5
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    switch (compareValueAttr) {
      case "broj stanovnika":
        var y = d3
          .scaleLinear()
          .domain([
            0,
            Math.max(data[0][0].stanovnistvo, compareData[0][0].stanovnistvo) *
              1.2,
          ])
          .range([height, 0]);
        svg5.append("g").call(d3.axisLeft(y));

        // Bars
        svg5
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].stanovnistvo);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].stanovnistvo);
          })
          .attr("fill", "#344D78");

        svg5
          .selectAll("mybar2")
          .data(compareData)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]) + x.bandwidth() / 2;
          })
          .attr("y", function (d) {
            return y(d[0].stanovnistvo);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].stanovnistvo);
          })
          .attr("fill", "#DA1717");
        break;
      case "rodeni":
        var y = d3
          .scaleLinear()
          .domain([
            0,
            Math.max(data[0][0].rodeni, compareData[0][0].rodeni) * 1.2,
          ])
          .range([height, 0]);
        svg5.append("g").call(d3.axisLeft(y));

        // Bars
        svg5
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].rodeni);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].rodeni);
          })
          .attr("fill", "#344D78");

        svg5
          .selectAll("mybar2")
          .data(compareData)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]) + x.bandwidth() / 2;
          })
          .attr("y", function (d) {
            return y(d[0].rodeni);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].rodeni);
          })
          .attr("fill", "#DA1717");
        break;
      case "umrli":
        var y = d3
          .scaleLinear()
          .domain([
            0,
            Math.max(data[0][0].umrli, compareData[0][0].umrli) * 1.2,
          ])
          .range([height, 0]);

        svg5.append("g").call(d3.axisLeft(y));

        // Bars
        svg5
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].umrli);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].umrli);
          })
          .attr("fill", "#344D78");

        svg5
          .selectAll("mybar2")
          .data(compareData)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]) + x.bandwidth() / 2;
          })
          .attr("y", function (d) {
            return y(d[0].umrli);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].umrli);
          })
          .attr("fill", "#DA1717");
        break;
      case "razvedeni_brak":
        var y = d3
          .scaleLinear()
          .domain([
            0,
            Math.max(
              data[1][0].razvedeni_brak,
              compareData[1][0].razvedeni_brak
            ) * 1.2,
          ])
          .range([height, 0]);

        svg5.append("g").call(d3.axisLeft(y));

        // Bars
        svg5
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].razvedeni_brak);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].razvedeni_brak);
          })
          .attr("fill", "#344D78");
        svg5
          .selectAll("mybar2")
          .data(compareData)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]) + x.bandwidth() / 2;
          })
          .attr("y", function (d) {
            return y(d[0].razvedeni_brak);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].razvedeni_brak);
          })
          .attr("fill", "#DA1717");
        break;
      default:
        var y = d3
          .scaleLinear()
          .domain([
            0,
            Math.max(
              data[0][0].sklopljeni_brak,
              compareData[0][0].sklopljeni_brak
            ) * 1.2,
          ])
          .range([height, 0]);
        svg5.append("g").call(d3.axisLeft(y));
        // Bars
        svg5
          .selectAll("mybar")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]);
          })
          .attr("y", function (d) {
            return y(d[0].sklopljeni_brak);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].sklopljeni_brak);
          })
          .attr("fill", "#344D78");

        svg5
          .selectAll("mybar2")
          .data(compareData)
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return x(years[i]) + x.bandwidth() / 2;
          })
          .attr("y", function (d) {
            return y(d[0].sklopljeni_brak);
          })
          .attr("width", x.bandwidth() / 2)
          .attr("height", function (d) {
            return height - y(d[0].sklopljeni_brak);
          })
          .attr("fill", "#DA1717");
    }
  }
}

