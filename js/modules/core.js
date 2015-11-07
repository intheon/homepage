// defines global vars

// either | or
var rootUrl = "http://localhost/new-portfolio";
//var rootUrl = "http://intheon.uk";

// determine if offline mode should be used - not implemented yet
var internetStatus = (navigator.onLine ? true : false);

$(document).ready(function() {

	// make the news feeds draggable
	$(".resizable-grid").shapeshift();

	// have the scrollify plugin listen for scroll events
	$.scrollify({
		section: 		".full-page-panel",
		sectionName: 	"name",
		easing: 		"easeOutExpo",
		scrollSpeed: 	1000,
		offset : 		0,
		scrollbars: 	false,
		before: 		function(event){
			// event is just the number of the panel
			var integer = event;
			console.log(integer);
		}
	});


	// flow
	// get users metadata
	// render metadata
	// bind listeners / create navigation

	/*

	var UserWidgets = {

		ajaxHandler: function(method, type, payload)
		{

		}

		getUserId: function()
		{
			var usr = $("#user-name-hidden").html();
			UserWidgets.ajaxHandler

		},

		getUserProfile: function(id)
		{

		}
	};

	var NavigationHandler = {

	};

	UserWidgets.getUserId();
	*/
});




