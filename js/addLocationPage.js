var currentPosition, map, infoWindow;
var newLocation = new LocationWeatherCache();
//This function is called when the page is loaded, it initialises 
//the google maps onto the webpage, it then puts a marker in the 
//center of the page, which is the users current location.
function initMap() 
{    
    //localStorage.clear();
    getLocation();
    map = new google.maps.Map(document.getElementById('map'), {
    center: currentPosition,
    zoom: 20
    });
    
    infoWindow = new google.maps.InfoWindow({
    map: map,
    disableAutoPan: true
    });
    //infowindow.open(map, marker);
}
window.addEventListener('load', initMap);

//This function retrieves the users current location, this is then stored in 
//currentPosition and then sets the map to that position. It also retrieves 
//the accuracy of the location and displayes that on the webpage. An error will be
// displayed if browser does not support geolocation
function getLocation()
{// Check for geolocation support
    if (navigator.geolocation) 
    {
        // Get current location and transfer it to anonymous function
        navigator.geolocation.getCurrentPosition(function(position) 
        {
            currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                };
            map.setCenter(currentPosition);
            infoWindow.setPosition(currentPosition);
            infoWindow.setMap(map);
            infoWindow.setContent("Current Position");
        });
        
    }
    else
    {
        alert('Error: Your browser doesn\'t support geolocation.'); // check this one
    }
}

function upToDate() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById('addressInput').value;
    var addressFormated;
    if(address !== null & address !== ""){
        geocoder.geocode( {'address': address},function(results,status){
            if(status == 'OK'){
                var lat = results[0].geometry.location.lat(),
                    lng = results[0].geometry.location.lng();
                currentPosition = new google.maps.LatLng(lat, lng);
                map.setCenter(currentPosition);
                infoWindow.setPosition(currentPosition);
                infoWindow.setMap(map);
                addressFormated = results[0].formatted_address;
                infoWindow.setContent(addressFormated);

            }
            else{
                alert('Geocode was not successfull for the following reason: ' + status);
            }
        });
    }
}
document.getElementById('addressInput').addEventListener("keyup", upToDate, false);

function addLocation(){
    var address = document.getElementById('addressInput').value;
    if(address === null || address === ""){
        alert('You need to input address');
    }
    else{
        var nickname = document.getElementById('nicknameInput').value;
        if(nickname == "") nickname=address;
        newLocation.addLocation (currentPosition, nickname);
        var locationList = JSON.parse(localStorage.getItem(APP_PREFIX)) || []; 
        //alert(JSON.stringify(locationList));
        //If nothing is retrieved then they will strat a new array
        if(locationList === "" || locationList === null)
        {
            locationList = [newLocation];
        }
        else
        {
            locationList.push(newLocation); 
        }
    
        //Stores the array in to local storage
        localStorage.setItem(APP_PREFIX, JSON.stringify(locationList));
        
        //Changes the page to index.html
        window.location.href = "index.html";
    }
}