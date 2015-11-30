// root domain
var rootDomain = "http://localhost/";
//var rootDomain = "http://intheon.uk";

// determine if offline mode should be used - not implemented yet
var internetStatus = (navigator.onLine ? true : false);

var UserManager = {

 	ajaxHandler: function(method, endpoint, payload, callback, authorisation)
	{
	/*
		Because at the end of the day, the server still is king!
		@method - whether get, post, put, or delete.
		@endpoint - where abouts on the api you want to fire the request to.
		@payload - any data you want to send to the server.
		@callback - the function to handle the server response
		@authorisation - our cookie of a token to reidentify the user
	*/
		$.ajax({
			type: 	method,
			url: 	rootDomain + endpoint,
			headers:{
				Authorization: authorisation
			},
			data: 	{
				payload: 	payload
			},
			success: function(response){
				callback(response);
			},
			error: function(response)
			{
				console.log("server sez: ", response);
			},
			statusCode: function(status)
			{
				console.log(status);
			}
		});
	},

	getUsersProfile: function()
	{
		var cookie = JSON.parse($.cookie("authToken"));
		var cookieString = $.cookie("authToken");
		UserManager.ajaxHandler("GET", "rest-backend/api/user/" + cookie.username, null, UserManager.parseUsersProfile, cookieString);
	},

	parseUsersProfile: function(profile)
	{
		console.log(profile);
	}

}

$(document).ready(function() {

	UserManager.getUsersProfile();

});


	/* todo... enabled scrollify 
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
		}
	});

	// now, the meat

	// flow
	// get users metadata
	// if they are new, say hello, and prompt an introduction on how to add plugins
	// ascertain what plugins are needed
	// render
	// bind listeners / create navigation

	var UserMan = {

		// because at the end of the day, the server still is king
 		ajaxHandler: function(method, type, payload)
		{
			$.ajax({
				type: 	method,
				url: 	rootUrl + "/php/module_manage_credentials.php",
				data: 	{
					type: 		type,
					payload: 	JSON.stringify(payload)
				},
				success: function(response){
					console.log(response);
					//LoginModule.parseServerResponse(response);
				}
			});
		},

		getUserId: function()
		{
			var usr = $("#user-name-hidden").html();
			UserMan.ajaxHandler("GET", "getUserId", usr);
		},

		getUserProfile: function(id)
		{
			var fakePayload = [
			{
				name: "Calendar"
			},
			{
				name: "Todo"
			},
			{
				name: "News"
			}];

			NavigationHandler.addModules(fakePayload);
			MainContentHandler.addModules(fakePayload);
		}
	};

	var NavigationHandler = {
		addModules: function(payload){
			console.log("omg this works");
			console.log(payload);
		};	
	};

	var MainContentHandler = {
		addModules: function(payload){
			console.log("well hot piss");
		};
	};


	UserMan.getUserProfile();
*/






