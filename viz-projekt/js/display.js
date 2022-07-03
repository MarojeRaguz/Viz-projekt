var slider = document.getElementById("myRange");
var paragraph = document.getElementById("year");
var title = document.getElementById("informationTitle");
var attrDescription = document.getElementById("attrDescription");
var compareValueAttr = "broj stanovnika";
var mainValueAttr = "broj stanovnika";
paragraph.innerHTML = "Godina: " + slider.value;
slider.oninput = function () {
  paragraph.innerHTML = "Godina: " + slider.value;
  attrDescription.innerHTML = "po županijama u " + slider.value +". godini"
  displayCro();
};
hideCompareChart(true)

function changeData() {
  console.log(selected);
  if (selected != "Republika Hrvatska") {
    if (selected == "Grad-Zagreb") {
      title.innerHTML = "Grad Zagreb";
    } else {
      title.innerHTML = selected + " županija";
    }
    d3.select("#myRange").style("visibility", "hidden");
    d3.select("#year").style("visibility", "hidden");
    attrDescription.innerHTML="po godinama od 2017. do 2021. godine"
    addCompare1(selected);
    hideCompareChart(false)
    displayCountry();
  } else {
    title.innerHTML = "Republika Hrvatska";
    d3.select("#myRange").style("visibility", "visible");
    d3.select("#year").style("visibility", "visible");
    attrDescription.innerHTML = "po županijama u " + slider.value +". godini"
    hideCompareChart(true);
    displayCro();
  }
}
var optionArray = [];

jQuery.ajax({
  dataType: "json",
  url: "2017.json",
  async: false,
  success: function (data) {
    data.forEach((element) => {
      optionArray.push(element.zupanija);
    });
  },
});

optionArray.forEach((element) => {
  $("#compare2").append(
    $("<option></option>").attr("value", element).text(element)
  );
});

function clearCompare2() {
  $("#compare2").empty()
  $("#compare1").empty()
}

function addCompare1(text) {
  $("#compare1").append(
    $("<option></option>")
      .attr("selected", text)
      .attr("disabled", "disabled")
      .text(text)
  );
}

$('#compare2').on('change', '', function () {
  displayCountry()
});

$('#compare3').on('change', '', function () {
  var compareValue = document.getElementById("compare3")
  compareValueAttr = compareValue.options[compareValue.selectedIndex].value
  console.log(compareValueAttr)
  displayCountry()
});

$('#compareMain').on('change', '', function () {
  var compareValue = document.getElementById("compareMain")
  mainValueAttr = compareValue.options[compareValue.selectedIndex].value
  console.log(mainValueAttr)
  if (selected == "Republika Hrvatska") {
    displayCro();
  }else{
    displayCountry();
  }

});

function hideCompareChart(hide) {
  if (hide) {
    d3.select("#comparediv").style("visibility", "hidden");
  } else {
    d3.select("#comparediv").style("visibility", "visible");
  }
}




