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

	ajaxHandler: function(method, endpoint, payload, callback)
	{
	/*
		@method - whether get, post, put, or delete.
		@endpoint - where abouts on the api you want to fire the request to.
		@payload - any data you want to send to the server not included in the url
		@callback - the function to handle the server response
	*/
		$.ajax({
			type: 	method,
			url: 	rootDomain + endpoint,
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
			LoginModule.ajaxHandler("POST", "/login/" + payload.usr + "/" + payload.pwd, null, LoginModule.parseServerResponse);
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
		console.log(typeof response);
		switch (response){
			case "exists":
				LoginModule.createErrorMSG("This username already exists");
				break;

			case "nonexistent":
				LoginModule.createErrorMSG("This username or password doesn't exist. <br /><br /> Please register");
				break;

			case "incorrectpw":
				LoginModule.createErrorMSG("Incorrect Password");
				break;

			case "success":
				window.location = "index.php";
				break;

			default:
				LoginModule.createErrorMSG("Computer says no. Something broke. Go outside and play.");
				break;
		}
	}

};
