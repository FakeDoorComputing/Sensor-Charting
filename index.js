var watchID;
var accelerometerOptions = { frequency: 2000 };  // Update every 2 seconds
var freq = 3000;
accelerometerOptions.frequency = 3000; //changed my mind - now 3 seconds


//when the page is created...
$(document).on("pagecreate", "#page1", function () {

	//setup listener for the toggle switch
	$("#flipswitch").on("change", function() {

		if( $(this).val() == "on" ) startSensor();
		else if ( $(this).val() == "off" ) stopSensor();

	});

	//setup listener for the slider
	$("#slider").on("slidestop", function() {


		//the value from the slider is text - it needs to be turned into an integer
		freq = parseInt($(this).val());

		updateFreq(freq);

	});

});


function startSensor() {
	watchID = navigator.accelerometer.watchAcceleration( accelerometerSuccess, accelerometerError, accelerometerOptions);
}


function stopSensor() {
	navigator.accelerometer.clearWatch(watchID);

	$('#sensorX').val("");
	$('#sensorY').val("");
	$('#sensorZ').val("");
	$('#timestamp').val("");
}

function accelerometerSuccess(acceleration) {

	$('#sensorX').val("Waiting...");
	$('#sensorY').val("Waiting...");
	$('#sensorZ').val("Waiting...");
	$('#timestamp').val("Waiting...");

	$('#sensorX').val(acceleration.x);
	$('#sensorY').val(acceleration.y);
	$('#sensorZ').val(acceleration.z);
	var time= new Date(acceleration.timestamp)
	$('#timestamp').val(time);
}

function accelerometerError() {
   alert('Error');
}

function updateFreq(freq) {
	accelerometerOptions.frequency = freq;
	stopSensor();
	startSensor();
}
