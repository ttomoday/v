$(function() {

	// Parallax
    // $.stellar();

    //ScrollTo
	$('.scrollTo').click(function(){
		var idscroll = $(this).attr('href');
		$.scrollTo(idscroll, 1500, {easing:'easeInOutQuart'} );
		return false;
	});

	// Init scroll animation
	new WOW().init();

});

// Initialize google map
function initializeMap() {
    // Basic options for a simple Google Map
	var mapOptions = {
	    // How zoomed in you want the map to start at (always required)
	    zoom: 15,

	    // The latitude and longitude to center the map (always required)
	    center: new google.maps.LatLng(49.841871, 24.033440), // New York

	    // How you would like to style the map. 
	    // This is where you would paste any style found on Snazzy Maps.
	    styles:[
  {
  	featureType: 'all',
    elementType: 'all',
    "stylers": [
      { "hue": "#25211F" }
    ]
  }
]
	};

	// Get the HTML DOM element that will contain your map 
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('map-canvas');

	// Create the Google Map using our element and options defined above
	var map = new google.maps.Map(mapElement, mapOptions);

	// Let's also add a marker while we're at it
	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(49.841871, 24.033440),
	    map: map,
	    title: 'Kava тут!'
	});
}

google.maps.event.addDomListener(window, 'load', initializeMap);