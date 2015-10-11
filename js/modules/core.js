// defines global vars

$(document).ready(function() {
	$(".resizable-grid").shapeshift();

	// to style when links are clicked

	$('.nav-link').click(function(){

		var h = $(this).attr("href");

		$('html, body').animate({
			scrollTop: $( h ).offset().top
		}, 500);

		window.location.hash = h; 

		$(".nav-link").removeClass("active-nav");

		$(".nav-link[href='"+h+"']").addClass("active-nav");

		return false;

	});

	// to style when page is loaded (it might already have a hash in there)


});



var internetStatus = (navigator.onLine ? true : false);



