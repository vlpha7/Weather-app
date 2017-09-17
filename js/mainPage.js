// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationIndex)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationIndex);
    // And load the view location page.
    location.href = 'viewlocation.html';
}



///The html area where we will add our list to it
var locationListElement = document.getElementById('locationListHtml');
var listHTML = "";





//Retrieving the stored array from local storage
var locationList=JSON.parse(localStorage.getItem(APP_PREFIX));






//This will check if there is anything in local storage, if not it will
//display "No regions stored" in the list. It will then go through all the 
//saved regions and successfully load them through the Region class. It will then 
//retrieve the Name and Time saved via the necessary Region public methods, then will 
//display all svaed region names and times on the list.
if (locationList !== null)
    {
        if(locationList.length !== 0)
            {
                for(var i = (locationList.length)-1; i>-1; i--)
                    {
                        var locationPDO = locationList[i]
                        var viewingLocation = new LocationWeatherCache()
                        viewingLocation.initialiseFromPDO(locationPDO);
    
                        //This will add the name and time to the list. It also makes sure that the function viewRegion is run when pressed, with the input being i which is it's position in the array.
                        //listHTML += "<tr onmousedown=\"viewLocationPage(" + i + ")\" class=\"full-width mdl-data-table__cell--non-numeric\">" + viewingLocation.getnickname() 
                        //listHTML += "<tr class=\"subtitle\">" + viewingLocation.getlocations()  
                        listHTML += '<li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation('+i+');">'
                        listHTML += '<span class="mdl-list__item-primary-content">'
                        listHTML += '<img class="mdl-list__item-icon" id="icon0" src="images/loading.png" class="list-avatar" />'
                        listHTML += '<span>'+ viewingLocation.getnickname() +'</span>'
                        listHTML += '<span id="weather'+i+'" class="mdl-list__item-sub-title"></span>'
                        listHTML += '</span>'
                        listHTML += '</li>'
                        var locationLatLng= viewingLocation.getLocation();
                        var url = 'https://api.darksky.net/forecast/adc3dfc45bd415dde450e57a83ad95d5/'+locationLatLng.lat +','+ locationLatLng.lng + '?exclude=hourly,minutely';
                        viewingLocation.getSummary(url,i);
                    }
         
          
            }
        else
            {
                listHTML += ('<li>'+ 'No locations stored'+'</li>');
            }
    }
else
    {
        listHTML += ('<li>'+ 'No locations stored'+'</li>');
    }

locationListElement.innerHTML = listHTML;

