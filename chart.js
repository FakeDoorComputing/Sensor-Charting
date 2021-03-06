var dps = [],
		xps=[],
		yps=[],
		zps=[];   //dataPoints.
var chart, startTime, watchID;
var accelerometerOptions = { frequency: 300 };

$(document).on("pagecreate", "#chartPage", function () {


		//setup listener for the toggle switch
		$("#flipswitch").on("change", function() {

			if( $(this).val() == "on" ) startSensor();
			else if ( $(this).val() == "off" ) stopSensor();

		});

	//store start time in unixtime
	startTime = Date.now();

	//setup chart
    chart = new CanvasJS.Chart("chartContainer",{
      	title :{
      		text: "X,Y,Z values"
      	},
      	axisX: {
      		title: "Time (seconds)"
      	},
      	axisY: {
      		title: "Values"
      	},
      	data: [{
      		type: "line",
      		dataPoints : xps
      	},
				{
      		type: "line",
      		dataPoints : yps
      	},
				{
      		type: "line",
      		dataPoints : zps
      	}]
   	});


});

function startSensor() {
	watchID = navigator.accelerometer.watchAcceleration(updateChart, accelerometerError, accelerometerOptions);
}

function stopSensor() {
	navigator.accelerometer.clearWatch(watchID);

}

function accelerometerError() {
   alert('Error');
}

function updateChart(acceleration) {

	var xValue=acceleration.x,
			yValue=acceleration.y,
			zValue=acceleration.z;

	$("#valuesText").val("X "+xValue+", Y "+yValue+", Z "+zValue);

		//x value is time since start
		xVal = Date.now() - startTime;
		//concert from milliseocnds to seconds (divide by a thousand)
		xVal = xVal / 1000;

		//add them to the data points to draw
		xps.push({x: xVal,y: xValue});
		yps.push({x: xVal,y: yValue});
		zps.push({x: xVal,y: zValue});

		//don't let the chart get too big
		//if there are more than 100 data points then start removing older data points
      	if (xps.length >  30 )
      	{
      		xps.shift();
					yps.shift();
					zps.shift();
      	}

		//redraw the chart
      	chart.render();
	  }
