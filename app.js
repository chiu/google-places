var map;
var infowindow;

function initialize() {
  var vancouver = new google.maps.LatLng(45.637498, -122.657375);
var placetypes1 = ['liquor_store', 'lodging'];

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: vancouver,
    zoom: 15
  });
  var request = {
    location: vancouver,
    radius: 5000,
    types: placetypes1
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);