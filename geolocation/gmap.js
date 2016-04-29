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

	var km = computeDistance(position.coords, ourCoords);
	var distance = $("distance");
	distance.innerHTML = "You are " + km + " km from the HQ";

	showMap(position.coords);
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
//计算距离
function computeDistance(startCoords, destCoords){
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371;//km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) * 
					Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
}

var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
};

function degreesToRadians(degrees){
	var radians = (degrees * Math.PI)/180;
	return radians;
}

//位置地图
var map;
function showMap(coords){
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = $("map");
	map = new google.maps.Map(mapDiv, mapOptions);

	var title = "Your Location";
	var content = "You are here: " + coords.latitude + ", " + coords.longitude;
	addMarker(map, googleLatAndLong, title, content);
}

//加大头钉
function addMarker(map, latlong, title, content){
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};
	var marker = new google.maps.Marker(markerOptions);

	var infoWindowOptions = {
		content: content,
		position: latlong
	};
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	google.maps.event.addListener(marker, "click", function(){
		infoWindow.open(map);
	});
}