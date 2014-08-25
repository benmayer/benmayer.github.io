
$(document).ready(function(){
	console.log("ready");
	var hash = window.location.hash = "/map";

	$(window).on('hashchange', function() {
	  gethash(window.location.hash);
	});

	$('a[href^="#"]').on('click', function(e){
		e.preventDefault();
		var link = $(this).attr('href').replace('#', '');
		window.location.hash = "/"+link;
	});
});
$(window).bind("load", function() {
	console.log("loaded");
	$(".fancybox").fancybox(
		{
	    padding    : 0,
	    margin     : 5,
	    nextEffect : 'fade',
	    prevEffect : 'fade',
	});
});
$(document).bind('scroll',function(e){
    // $('.section-content').each(function(){
    // 	var content = $(this);
    // 	 console.log( content.attr('id'), content.offset().top ,  ',',  content.height() ,',', window.pageYOffset + 10);
    //     if (
    //     	 content.offset().top < window.pageYOffset +10 //begins before top
    //     	 && content.offset().top + content.height() > window.pageYOffset + 10 //but ends in visible area //+ 10 allows you to change hash before it hits the top border
    //     ) {
    //         window.location.hash = content.attr('id');
    //     } 
    // });
});

function gethash(url){
	var hash = url.substring(2),
	scrollTo = $("#"+hash);

	$('.nav-sections a').removeClass('active');

	$('body').animate({
	   scrollTop: scrollTo.offset().top
	});
	
	$('.nav-sections a[href="#'+hash+'"]').addClass('active');
}
