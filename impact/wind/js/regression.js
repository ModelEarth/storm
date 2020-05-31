function getDimensions(x,y){

  var returnX=[];
  var returnY=[];
  var returnPairs = [];
  allData.forEach(function(d){
    var pair = {x: d[x],y: d[y]};
    returnPairs.push(pair);
    returnX.push(d[x]);
    returnY.push(d[y]);
  });
  return {x:returnX,y:returnY,pairs:returnPairs};
}

function updateTitle(x,y){
  //var title = d3.select("#title").text("Linear Regression:");
  //var subtitle = d3.select("#subtitle").text(x+" vs "+y);
  var title = d3.select("#title").text(x+" vs "+y);
}

// returns slope, intercept and r-square of the line
//Pulled from http://bl.ocks.org/benvandyke/8459843
function leastSquares(xSeries, ySeries) {
  var reduceSumFunc = function(prev, cur) { return prev + cur; };
  
  var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
  var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

  var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
    .reduce(reduceSumFunc);
  
  var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
    .reduce(reduceSumFunc);
    
  var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
    .reduce(reduceSumFunc);
    
  var slope = ssXY / ssXX;
  var intercept = yBar - (xBar * slope);
  var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
  
  return [slope, intercept, rSquare];
}
//http://snipplr.com/view/37687/random-number-float-generator/
function randomFloatBetween(minValue,maxValue,precision){
    if(typeof(precision) == 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
}

//"draw" the line with many points respecting the calculated equation
function calculateLineData(leastSquares,xRange,iterations){
  var returnData = [];
  for(var i=0; i<iterations; i++){
    var randomX = randomFloatBetween(xRange[0],xRange[1]);
    returnData.push({
      xVal:randomX,
      yVal: (randomX*leastSquares[0])+leastSquares[1]
    });
  }
  return returnData;
}

function updateChart(x,y){

  updateTitle(x,y);
  //Fetch data
  var records = getDimensions(x,y);

  //Reset scale
  yScale.domain(d3.extent(records.y));
  xScale.domain(d3.extent(records.x));

  //re-assign data (or assign new data)
  var selectedCircles = d3.select("#graph-plane")
                          .selectAll(".circles")
                          .data(records.pairs)

  //give a transition on the existing elements
  selectedCircles
    .transition().duration(animDuration)
    .attr("transform",function(d){return "translate("+xScale(d.x)+","+yScale(d.y)+")";})
    .style("fill","steelblue");

  //Append any new elements and transition them as well
  selectedCircles.enter()
                .append("circle")
                .attr("class","circles")
                .attr("r",5)
                .style("fill","steelblue")
                .transition().duration(animDuration)
                .attr("transform",function(d){return "translate("+xScale(d.x)+","+yScale(d.y)+")";});

  //Remove any dom elements which are no longer data bound
  selectedCircles.exit().remove();
                  
  //Update Axes
  d3.select(parentId).select(".x.axis").transition().duration(animDuration).call(xAxis);
  d3.select(parentId).select(".y.axis").transition().duration(animDuration).call(yAxis);

  //Update Regression
  line.x(function(d) { return xScale(d.xVal); })
      .y(function(d) { return yScale(d.yVal); });

  var leastSquaresCoeff = leastSquares(records.x, records.y);
  var lineData = calculateLineData(leastSquaresCoeff,d3.extent(records.x),200);

  var trendline = d3.selectAll(".trendline")
                        .transition().delay(1000).duration(500)
                        .attr("d",line(lineData));

  d3.select("#equation").text(function(){
    return (leastSquaresCoeff[1]<0)?
      "y="+leastSquaresCoeff[0].toFixed(2)+"x"+
          leastSquaresCoeff[1].toFixed(2)+" rSquared: "+
          leastSquaresCoeff[2].toFixed(2) 
          :
      "y="+leastSquaresCoeff[0].toFixed(2)+"x"+"+"+
          leastSquaresCoeff[1].toFixed(2)+" rSquared: "+
          leastSquaresCoeff[2].toFixed(2);
  });
}

