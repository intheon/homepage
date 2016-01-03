// root domain
var rootDomain = "http://localhost/";
//var rootDomain = "http://intheon.uk";

// determine if offline mode should be used - not implemented yet
var internetStatus = (navigator.onLine ? true : false);

// My own little plugin to interact with the rest api
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
				if (response.status == 401) window.location = "login.php";
			},
			statusCode: function(status)
			{
				console.log(status);
			}
		});
	},

	usersAuth: function()
	{
		var cookie = JSON.parse($.cookie("authToken"));
		var cookieString = $.cookie("authToken");

		document.title = "Welcome home, " + cookie.username;
		$("#userName").html(cookie.username);

		return {
			cookie: cookie,
			cookieString: cookieString
		}
	},

	signOut: function()
	{
		var result = $.removeCookie("authToken");
		console.log(result);

		if (result) window.location = "login.php";
	},


	getUsersProfile: function(pCallback)
	{
		var auth = UserManager.usersAuth();
		UserManager.ajaxHandler("GET", "rest-backend/api/user/" + auth.cookie.username, null, pCallback, auth.cookieString);
	},

	getUsersWidgets: function(wCallback)
	{
		var auth = UserManager.usersAuth();
		UserManager.ajaxHandler("GET", "rest-backend/api/widget" + auth.cookie.username, null, wCallback, auth.cookieString);
	},

	parseUsersProfile: function(profile)
	{
		if (profile == "nowidgets") UserManager.introduction()
		else
		{
			var asObj = JSON.parse(profile);
			for (var item in asObj) UserManager.loadWidget(asObj[item]);
		}
	},

	createStatistic: function(label, value)
	{
		// create the bastard initially
		if ($("#" + label + "Stat").length === 0)
		{
			$(".statistics-info").append("<div class='stat-item column-6' id='"+label+"Stat'>\
				<div class='value'>"+value+"</div>\
				<div class='label'>"+label+"</div>\
			</div>")
		}
		else // then just update its value
		{
			$("#" + label + "Stat .value").html(value);
		}

	},

	decrementStatistic: function(label)
	{
		var current = $("#" + label + "Stat .value")[0].innerText;

			current--;

			if (current >= 0) $("#" + label + "Stat .value")[0].innerText = current;

	},

	loadWidget: function(widgetInformation)
	{
		var wd = {
				primaryKey: widgetInformation.widgetId,
				widgetName: widgetInformation.widgetName,
				stateId: widgetInformation.stateId,
				widgetCodeName: widgetInformation.widgetCodeName,
				jsonData: widgetInformation.widgetData
			};

		// ensure that theres some parsable json for empty states
		if (!wd.jsonData) wd.jsonData = '{"items":[]}';

			wd = JSON.stringify(wd)
		// create a skeleton for each widget
		$("#content-here").append("<div class='row full-page-panel ui stackable 2 column grid' id='"+widgetInformation.widgetCodeName+"-widget' data-widget="+widgetInformation.widgetCodeName+">\
				<div class='three wide column'>&nbsp;</div>\
				<div class='thirteen wide column content-area'></div>\
			</div>");

		// inject the template html
		$("#" + widgetInformation.widgetCodeName + "-widget .content-area").load("../homepage/widgets" + widgetInformation.widgetPath, function(){
			// add the json to localstorage
			var stored = UserManager.addToLocalStorage(widgetInformation.widgetCodeName, wd);

			// dynamically call the initialisation method located in the template's own code to render the widget data
			window[widgetInformation.widgetName].init(stored);
		});

		// load navigation
		$("#navigation-here").append("<div class='navigation-item' id='" + widgetInformation.widgetName + "-navigation'>"+ widgetInformation.widgetName+ "</div>");

		$(".navigation-item:first-child").addClass("active-nav");

		$("#" + widgetInformation.widgetName + "-navigation").click(function(){

				$(".navigation-item").removeClass("active-nav");
				$("#" + widgetInformation.widgetName + "-navigation").addClass("active-nav");

				var ident = widgetInformation.widgetName.toLowerCase();

				$.scrollify.move("#" + ident);

		});

		// make the panels scrollable
		UserManager.applyScrollify();
	},

	applyScrollify: function(destroy)
	{
		if (destroy) $.scrollify.disable();
		else
		{
			$.scrollify({
				section: 		".full-page-panel",
				sectionName: 	"widget",
				easing: 		"easeOutExpo",
				scrollSpeed: 	1000,
				scrollbars: 	false,
				before: 		function(event){
					// event is just the number of the panel
					//var integer = event;
				}
			});
			$.scrollify.enable();
		}

	},

	introduction: function(returned)
	{
		var auth = UserManager.usersAuth();
		if (!returned)
		{
			UserManager.ajaxHandler("GET", "rest-backend/api/widget", null, UserManager.introduction, auth.cookieString);
		}
		else
		{
			var username = auth.cookie.username;
			var modalHeader = "Howdy, " + username + "!";
			var parsed = JSON.parse(returned);
			var modalContent = "<div class='widget-selector'><div class='widget-header'>Widgets are the things that give the site extra spice. Select some to start: </div>";

			for (item = 0; item < parsed.length; item++)
			{
				modalContent+= "<div class='widget-selector-item row'><div class='widget-name ui toggle checkbox column-4'><input type='checkbox' name='public' tabindex='0' class='hidden' id='"+parsed[item].w_codeName+"Widget' data-widget-id='"+parsed[item].w_id+"'><label>"+parsed[item].w_name+"</label></div><div class='widget-desc column-6'>"+ parsed[item].w_desc +"</div></div>"
			}

			modalContent+= "</div>";

			UserManager.createModal(auth, modalHeader, modalContent, UserManager.firstWidgets);
		}
	},

	createModal: function(info, modalHeader, modalContent, eventListenerConfig)
	{
		$("body").prepend("<div class='ui modal' id='modal'>\
			<i class='close icon'></i>\
			<div class='header modal-header'>" + modalHeader + "</div>\
			<div class='modal-content'>" + modalContent +"</div>\
			<div class='actions'>\
				<div class='ui green button' id='add-item-modal'>Cool</div>\
			</div>\
		</div>");
		$('.ui.checkbox').checkbox();
		$('.ui.modal').modal('show');

		// this is a callback - it will be named something else! look at the caller!
		eventListenerConfig();
	},

	firstWidgets: function()
	{
		$("#add-item-modal").click(function(){

			// find out the id's of the widgets the user chose to add
			var states = [];

			$(".ui.checkbox input").each(function(){
				var $this = $(this);
				if ($this.is(":checked")) states.push($this.context.dataset.widgetId);
			});

			// create a blank state for each of them using the api
			var auth = UserManager.usersAuth();
			var count = 0;
			var num = states.length;


			for (statePointer = 0; statePointer < states.length; statePointer++)
			{
				var payload = {
					"userId" : auth.cookie.userId,
					"widgetId" : states[statePointer]
				};

				$.when(UserManager.ajaxHandler("POST", "rest-backend/api/state", payload, function(){}, auth.cookieString)).then(function(){
					count++;
					if (count === num) UserManager.getUsersProfile(UserManager.parseUsersProfile);
				});
			}

		});
	},

	addToLocalStorage: function(identifier, data)
	{
		localStorage.setItem(identifier, data);

		return localStorage.getItem(identifier);
	},

	returnUserPrimary: function()
	{
		// returns the primary key of the currently logged in user from the cookie
		var userId = UserManager.usersAuth();
			userId = JSON.parse(userId.cookieString)
			userId = userId.userId;

		return userId;
	},

	returnWidgetPrimary: function(codeName)
	{
		// finds the value in localStorage and returns the primary key associated with it
		var store = localStorage.getItem(codeName);
			store = JSON.parse(store);
			store = store.primaryKey;

		return store;
	},

	returnStatePrimary: function(codeName)
	{
		// finds the value in localStorage and returns the primary key associated with it
		var store = localStorage.getItem(codeName);
			store = JSON.parse(store);
			store = store.stateId;

		return store;
	},

	returnStateData: function(codeName)
	{
		// finds the value in localStorage and returns the primary key associated with it
		var store = localStorage.getItem(codeName);
			store = JSON.parse(store);
			store = store.jsonData;

		return store;
	},

};

var DisplayManager = {


}

// GO!
$(document).ready(function() {

	// all requests are authenticated by the api (tokenAuth.php is middleware which runs on each request)
	UserManager.getUsersProfile(UserManager.parseUsersProfile);

	// add an event listener to allow log out
	$("#signOut").click(function(){
		UserManager.signOut()
	});

});

	
	/*

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






