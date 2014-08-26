$(document).ready(function(){
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
});
$(window).bind("load", function() {
	$(".fancybox").fancybox(
		{
	    padding    : 0,
	    margin     : 5,
	    nextEffect : 'fade',
	    prevEffect : 'fade',
	});
});
