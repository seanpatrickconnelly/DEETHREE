// @TODO: YOUR CODE HERE!
// TAs: This material was covered while I was drunk on the beach.
// In fact, I 
// Nevermind. 
// Have mercy, to the extent you own it please.

// I'd start this chicken chase by using some of the boiler-plate stuff in class
// that holds the width and height of our viz to 'readable' while the user 
// presents different screen sizes

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Man. Here, I am going to create an SVG wrapper.
// Then I use append to a svg group that will hold the chart.
// This is pretty much the hair band chart
// Hair Band Charts > Rick Astley Lyric Parsing

// the last part I copied in. It shifts the latter by left and top margins? Ok.

var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth) 
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params TODO:
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label TODO:
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label TODO:
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// I really like how you guys formulate these things w a shite load of variables. 
// At this point, I'm wondering if I should have had so many cocktails on the beach.
// I figured it out. Yes, I should have.

//function used for updating circles group with a transition to
// new circles TODO:
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip TODO:
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "poverty") {
    var label = "poverty:";
  }
  else {
    var label = "poverty";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    // I'm kind of thinking the offset (above) should be different. Maybe 0,0 or something. We want the state to 
    // show up (abbreviated) in the circle. 

    // from here, the hair band exercise. The code below would have to be edited for the data.csv
    // fields such that the graph I'm (not) building would work perfectly.
    
    .html(function(d) {
      return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);
// I actually am thinking I wouldn't need some fo what's below for the basic homework ...
// there aren't any mouseovers, just flat displays. 

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }

// Retrieve data from the CSV file and execute everything below
// which, if edited properly, would call all the data from the CSV that we need via 
// a python server which thanks but not tonight my love i have a headache
// and create the bubble chart of poverty v access to healthcare

d3.csv("data.csv", function(err, healthdata) {
  if (err) throw err;

  // parse data
  healthdata.forEach(function(data) {
    data.poverty = +data.poverty;
    data.lacks_health_care = +data.healthcare;
  });

  // xLinearScale function above csv import TODO:
  var xLinearScale = xScale(healthdata, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthdata, d => d.num_hits)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles TODO:
  var circlesGroup = chartGroup.selectAll("circle")
    .data(healthdata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", 20)
    .attr("fill", "blue")
    .attr("opacity", ".5");

  
  // append y axis TODO:
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare %");

  // updateToolTip function above csv import TODO:
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
// i do also feel like i'm missing a function that would assign the state abbr. to each circle.
// it would be really cool to do that. 
// the code below is from the hair bands exercise. i dont think i need any of it for what i'm (not) doing.





//   // x axis labels event listener TODO:
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(hairData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
//         }
//         else {
//           albumsLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           hairLengthLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// });
// // there's a lot of boilerplate, above. I do like the way teh variables are declared
// // and called upon in pretty tight queries.
// // You should have seen Florida.
