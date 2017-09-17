
// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

function LocationWeatherCache()
{
    // Private attributes:

    var locations;
    var callbacks = {};
    var nicknameDm;

    // Public methods:

    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
    };
    
    //This adds the time and date as a string to the time variable
    
    this.getLocation = function(){
        console.log(locations);
        return locations;  
    };
    this.getnickname = function(){
        //alert(nicknameDm);
        return nicknameDm;  
    };
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    
    this.locationAtIndex = function(index) {
    };

    // Given a latitude, longitude and nickname, this method saves a
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(locationCo, nickname)
    {
        locations = locationCo;
        nicknameDm = nickname;
    }

    // Removes the saved location at the given index.
    //
    this.removeLocationAtIndex = function(index)
    {
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
        var locationWeatherCachePDO = {
            locations : locations,
            nicknameDm : nicknameDm,
        };    
        return locationWeatherCachePDO;    
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
        locations = locationWeatherCachePDO.locations;
        nicknameDm = locationWeatherCachePDO.nicknameDm;
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the
    // weather object for that location.
    //
    this.getWeatherAtIndexForDate = function(index, date, callback) {
    };

    // This is a callback function passed to darksky.net API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.getSummary = function(url,i) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(json) {
            console.log(json);
                var spanHtml = document.getElementById('weather'+i);
                spanHtml.innerHTML = "Weather Summary: " + json.currently.summary;
        }
        });
    }
    this.weatherResponse = function(response) {
        $.ajax({
        url: response,
        dataType: 'jsonp',
        success: function(json) {
            var needInfo = json.daily.data[0]; 
            var infoHTML = document.getElementById('info');
            var addHTML ="";
            //console.log(needInfo);
            addHTML += "ICON: " + needInfo.icon + "</br>";
            addHTML += "SUMMARY: " + needInfo.summary + "</br>";
            addHTML += "DEWPOINT: " + needInfo.dewPoint + "</br>";
            addHTML += "HUMIDITY: " + needInfo.humidity*100 + "%</br>";
            addHTML += "MOONPHASE: " + needInfo.moonPhase + "</br>";
            addHTML += "TEMPERATUREMAX: " + ((needInfo.temperatureMax-32)/1.8).toFixed(2) + "*C</br>";
            addHTML += "TEMPERATUREMIN: " + ((needInfo.temperatureMin-32)/1.8).toFixed(2) + "*C</br>";
            addHTML += "WINDBEARING: " + needInfo.windBearing + "</br>";
            addHTML += "WINDSPEED: " + needInfo.windSpeed + "km/h</br>";
            infoHTML.innerHTML = addHTML;
        }
    });
    };

    // Private methods:

    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
    }
}
// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations(newLocation)
{
        
}
