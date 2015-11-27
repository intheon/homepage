var rootDomain = "http://localhost/rest-backend/api";
//var rootDomain = "http://intheon.uk/home";

$(document).ready(function(){

	$("#show-register").click(function(){
		LoginModule.showRegisterForm()
	});

	$("#register-details").click(function(){
		LoginModule.registerDetails();
	});

	$("#submit-sign-in").click(function(){
		LoginModule.signIn();
	});

	$("#login-forms .center").keyup(function(event){
		if (event.keyCode == 13)
		{
			LoginModule.signIn();
		}
	});
});


var LoginModule = {

	ajaxHandler: function(method, endpoint, payload, callback, authorisation)
	{
	/*
		@method - whether get, post, put, or delete.
		@endpoint - where abouts on the api you want to fire the request to.
		@payload - any data you want to send to the server not included in the url
		@callback - the function to handle the server response
		@authorisation - authorisation token to check if user is already logged in
	*/
		$.ajax({
			type: 	method,
			url: 	rootDomain + endpoint,
			headers: {
				Authorization: authorisation
			},
			data: 	{
				payload: 	payload
			},
			success: function(response){
				callback(response);
			}
		});
	},

	signIn: function()
	{
		var payload = {
			usr: 	$("#login-form-username").val(),
			pwd: 	$("#login-form-password").val(),
		}

		if (!payload.usr || !payload.pwd)
		{
			LoginModule.createErrorMSG("Please fill out your details!")
		}
		else
		{
			LoginModule.ajaxHandler("POST", "/login/" + payload.usr + "/" + payload.pwd, null, LoginModule.parseServerResponse, "noToken");
		}
	},

	showRegisterForm: function()
	{
		$("#login-forms").fadeOut(function(){
			$(this).hide(function(){
				$("#register-forms").fadeIn();
			})
		});
	},

	registerDetails: function()
	{
		var payload = {
			usr: 	$("#register-form-username").val(),
			pwd: 	$("#register-form-password").val(),
			nm: 	$("#register-form-name").val(),
			email: 	$("#register-form-email").val()
		}

		if (!payload.usr || !payload.pwd || !payload.nm || !payload.email)
		{
			LoginModule.createErrorMSG("Please fill out your details!")
		}
		else
		{
			LoginModule.ajaxHandler("POST", "registerNewUser", payload);
		}
	},

	createErrorMSG: function(message)
	{
		var error = "<div class='information-panel'><div class='information-dismiss'>x</div><div class='information-message'>"+ message +"</div></div>"

		// add it to dom
		$("body").prepend(error);

		// create handler for close icon
		$(".information-panel").click(function(){
			LoginModule.removeFromDom(".information-panel");
		});
	},

	removeFromDom: function(what)
	{
		$(what).fadeOut(function(){
			$(this).remove();
		});
	},

	parseServerResponse: function(response)
	{
		var parsedResponse = JSON.parse(response);

		if (parsedResponse.messageType == "message")
		{
			switch (parsedResponse.messageBody){
				case "exists":
					LoginModule.createErrorMSG("This username already exists");
					break;

				case "nonexistent":
					LoginModule.createErrorMSG("This username or password doesn't exist. <br /><br /> Please register");
					break;

				case "incorrectpw":
					LoginModule.createErrorMSG("Incorrect Password");
					break;

				default:
					LoginModule.createErrorMSG("Computer says no. Something broke. Go outside and play.");
					break;
				}
		}
		else if (parsedResponse.messageType == "token")
		{
			// set a cookie that is due to expire after a day
			$.cookie("authToken", parsedResponse.messageBody, { expires: 1 });

			window.location = "index3.php";

		}
	}

};
