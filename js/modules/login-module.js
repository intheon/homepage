var rootUrl = "http://localhost/homepage";
//var rootUrl = "http://intheon.uk/home";

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
				LoginModule.parseServerResponse(response);
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
			LoginModule.ajaxHandler("POST", "signInUser", payload);
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
		console.log(response);
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
