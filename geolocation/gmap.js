window.onload = getMyLocation;

function getMyLocation(){
	if(navigator.geolocation){
		console.log(navigator.geolocation);
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
		console.log("KAd");
	}else{
		alert("Oops, no geolocation support");
	}
}

function displayLocation(position){
	console.log(position);
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var div = $("location");
	console.log(div);
	div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
}

function displayError(error){
	var errorTypes = {
		0: "Unknown error",
		1: "Permisstion denied by user",
		2: "Position is not available",
		3: "Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if(error.code == 0 || error.code == 2){
		errorMessage = errorMessage + " " + error.message;
	}
	var div = $("location");
	div.innerHTML = errorMessage;
}