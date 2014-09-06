  function init() {

    var themap = document.getElementById('map'),
        classes = themap.className;
        zoom = 13;

        if ( window.innerWidth < 480) {zoom = 12}


        bensLondon = [
      {
        "featureType": "water",
        "stylers": [
          { 
            // "color": "#77B0BA" //twitter color
            "color": "#239acc" 
            // "color": "#78CBEB"
          }
        ]
      },{
        "featureType": "landscape",
        "stylers": [
          { "color": "#efefef" }
        ]
      },{
        "featureType": "road",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "administrative",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#ff8080" },
          { "weight": 4.3 }
        ]
      },{
        "featureType": "transit.line",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#4e4145" },
          { "visibility": "on" }
        ]
      },{
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#808080" }
        ]
      },{
      }
    ];
    
    var mapOptions = {
      zoom: zoom,
      center: new google.maps.LatLng(51.5191113,-0.1084786 ),
      disableDefaultUI: true,
      mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'benslondon']
          }
    };

    var map = new google.maps.Map(themap,
        mapOptions);

    var styledMapOptions = {
        name: "Ben's London"
      };
    var bensLondonMapType = new google.maps.StyledMapType(
        bensLondon, styledMapOptions);

    map.mapTypes.set('benslondon', bensLondonMapType);
    map.setMapTypeId('benslondon');

    setMarkers(map);

    
    google.maps.event.addListener(map, 'zoom_changed', function() {
        var zoomLevel = map.getZoom();
        if (zoomLevel > 14 ) { 
          themap.className = classes+" closeup zoom"+zoomLevel; 
        }
        else{
          themap.className = classes+" zoom"+zoomLevel;
        }
    });
}

function setMarkers(map){
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/36028700/media/recent?access_token=36028700.c2b4d0f.cc3f17f51cda4cc6a2d4083929d1a6d9",
    success : function(json){
      var i,
          posts = json.data;

      for ( i = 0;  i < posts.length ; i++) {
          
          var post = posts[i];
          if ( !post.location ) continue;  // filter out no locations
          
          var location = post.location,
              latLng = new google.maps.LatLng( location.latitude, location.longitude),
              image = post.images,
              title = location.name;  

          if ( !title ) {
             if(post.caption ){ title = post.caption.text;}
             else{title = '';}
          }
          
          marker = new RichMarker({
            position: latLng,
            map: map,
            draggable: false,
            flat: true, 
            anchor: RichMarkerPosition.MIDDLE,
            title : title,
            content: '<div class="spots"><div class="title"><span>'+title+'</span></div><div class="img"><a class="fancybox" rel="group" href="'+image.standard_resolution.url+'" title="'+title+'"><img src="'+image.low_resolution.url+'" alt="'+title+'"/></a></div></div>',
            zIndex : i
          });
        // google.maps.event.addListener(marker, 'click', function(){
        // });
      }
    }
  });
}



// Register an event listener to fire when the page finishes loading.
google.maps.event.addDomListener(window, 'load', init);


$(document).ready(function(){
	$.fn.visible = function(partial) {
	  
	    var $t            = $(this),
	        $w            = $(window),
	        viewTop       = $w.scrollTop(),
	        viewBottom    = viewTop + $w.height(),
	        _top          = $t.offset().top,
	        _bottom       = _top + $t.height(),
	        compareTop    = partial === true ? _bottom : _top,
	        compareBottom = partial === true ? _top : _bottom;
	  
	  return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	};

	var isTouch = ('ontouchstart' in window);
	var h = $(window).height();
	var ph = $('.section').height();

	if(isTouch){
		$('body').addClass("istouch");
	}
	if (ph < h ){  // check if css vh is working, if not fix with js on load #closeenough. 
		$('.section').css('min-height', h);
	}

	//get location -> if undefind set default to map
	var hash = window.location.hash.replace('#/', '');
	if(!hash){ hash = 'map';
		window.location.hash = "/map";
	}
	$('html, body').scrollTop($("#"+hash).offset().top );
	$('.nav-sections a[href="#'+hash+'"]').addClass('active');

	// change hash on click
	$('a[href^="#"]').on('click', function(e){
	    e.preventDefault();
	    var x = $(this).attr('href').replace('#', '');
	    $('html, body').animate({ 
	      scrollTop:  $("#"+x).offset().top
	    });
	});
});
$(window).bind('scroll',function(e){
	// change hash on scroll
	$('.section-content').each(function(){
	   if (
		   $(this).offset().top < window.pageYOffset + 10//begins before top
		   && $(this).offset().top + $(this).height() > window.pageYOffset + 10//but ends in visible area //+ 10 allows you to change hash before it hits the top border
	   ) {
		   	var x = $(this).attr('id');
	    	$('.nav-sections a').removeClass('active');
	    	window.location.hash = '/'+ x;
	    	$('.nav-sections a[href="#'+x+'"]').addClass('active');
	  }
	});
	$(".move").each(function(i, el) {
	  var el = $(el);
	  if (el.visible(true)) {
	    el.addClass("in");
	  } 
	});

	
});
$(window).bind("load", function() {
	$(".fancybox").fancybox(
		{
	    padding    : 0,
	    margin     : 10,
	    nextEffect : 'fade',
	    prevEffect : 'fade',
	});
});
