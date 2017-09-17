// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var locationIndex = JSON.parse(localStorage.getItem(APP_PREFIX + "-selectedLocation")); 
var locationList, locationPDO, viewingLocation, locationName,locationLatLng,jsondata;
var currentPosition, map, infoWindow;
var newLocation = new LocationWeatherCache();
//This function is called when the page is loaded, it initialises 
//the google maps onto the webpage, it then puts a marker in the 
//center of the page, which is the users current location.

if (locationIndex !== null)
{
    
    locationList=JSON.parse(localStorage.getItem(APP_PREFIX));
    console.log(locationList);
    locationPDO = locationList[locationIndex];
    
    viewingLocation = new LocationWeatherCache()
    viewingLocation.initialiseFromPDO(locationPDO);
    locationName = viewingLocation.getnickname();
    locationLatLng= viewingLocation.getLocation();
    document.getElementById("headerBarTitle").textContent = locationName;
}
function initMap() 
{    
    //localStorage.clear();
    map = new google.maps.Map(document.getElementById('map'), {
    center: locationLatLng,
    zoom: 20
    });
    
    infoWindow = new google.maps.InfoWindow({
    map: map,
    disableAutoPan: true
    });
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {'location': locationLatLng},function(results,status){
        if(status == 'OK'){
            infoWindow.setPosition(locationLatLng);
            infoWindow.setMap(map);
            infoWindow.setContent(results[0].formatted_address);

        }
        else{
            alert('Geocode was not successfull for the following reason: ' + status);
        }
    });
    //infowindow.open(map, marker);
}
window.addEventListener('load', initMap);

function chooseDate(){
    var dateUser = document.getElementById("dateInput").value;
    var date = new Date(dateUser)
    
    date = date.darkSkyDateString(); 
    var url = 'https://api.darksky.net/forecast/adc3dfc45bd415dde450e57a83ad95d5/'+locationLatLng.lat +','+ locationLatLng.lng + ',' + date +'?exclude=hourly,minutely,currently';
    var inLocal = false;
    viewingLocation.weatherResponse(url);
}
document.getElementById('dateInput').addEventListener("change", chooseDate, false);

function delLocation(){
    locationList.splice(locationIndex,1);
    localStorage.setItem(APP_PREFIX, JSON.stringify(locationList));
     window.location.href = "index.html";
}
