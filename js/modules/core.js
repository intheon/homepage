// defines global vars

$(document).ready(function() {
	$(".resizable-grid").shapeshift();

	// to style when links are clicked

	$('.nav-link').click(function(){

		var h = $(this).attr("href");

		scrollToElement(h);

		window.location.hash = h; 

		$(".nav-link").removeClass("active-nav");

		$(".nav-link[href='"+h+"']").addClass("active-nav");

		return false;

	});

	// to style when page is loaded (it might already have a hash in there)

	if (window.location.hash)
	{
		var url = window.location.hash;

		scrollToElement(url);

		$(".nav-link").removeClass("active-nav");

		$(".nav-link[href='"+url+"']").addClass("active-nav");
	}


});

function scrollToElement(el)
{
	$('html, body').animate({
		scrollTop: $( el ).offset().top
	}, 500);
}



var internetStatus = (navigator.onLine ? true : false);



