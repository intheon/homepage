var rootUrl = "http://localhost/homepage";
//var rootUrl = "http://intheon.uk/home";

$(document).ready(function(){

	$("#show-register").click(function(){
		showRegisterForm()
	});

	$("#register-details").click(function(){
		registerDetails();
	});

	$("#submit-sign-in").click(function(){
		signIn();
	});

	$("#login-forms .center").keyup(function(event){
		if (event.keyCode == 13)
		{
			signIn();
		}
	});


});	

function showRegisterForm(){
	$("#login-forms").fadeOut(function(){
		$(this).hide(function(){
			$("#register-forms").fadeIn();
		})
	});
}

function registerDetails(){
	// TODO FRONT END VALIDATION
	var payload = {
		usr: 	$("#register-form-username").val(),
		pwd: 	$("#register-form-password").val(),
		nm: 	$("#register-form-name").val(),
		email: 	$("#register-form-email").val()
	}

	// SUBMIT PAYLOAD TO PHP

	$.ajax({
		type: 	"POST",
		url: 	rootUrl + "/php/module_manage_credentials.php",
		data: 	{
			type: 		"registerNewUser",
			payload: 	JSON.stringify(payload)
		},
		success: function(response){
			switch (response){
				case "exists":
					createErrorMSG("This username already exists");
					break;

				case "nonexistent":
					createErrorMSG("This username doesn't exist, please register");
					break;

				case "incorrectpw":
					createErrorMSG("Incorrect Password");
					break;

				case "success":
					window.location = "index.php";
					break;

				default:
					createErrorMSG("No data received");
					break;
			}
		}
	});
}

function signIn(){
	var payload = {
		usr: 	$("#login-form-username").val(),
		pwd: 	$("#login-form-password").val(),
	}

	if (!payload.usr || !payload.pwd)
	{
		showErrorMessage("Please fill out your details!")
	}
	else
	{
		// SUBMIT PAYLOAD TO PHP
		$.ajax({
			type: 	"POST",
			url: 	rootUrl + "/php/module_manage_credentials.php",
			data: 	{
				type: 		"signInUser",
				payload: 	JSON.stringify(payload)
			},
			success: function(response){
					switch (response){
						case "success":
							window.location = "index.php";
							break;

						default:
							showErrorMessage("No data received");
							break;
					}
			}
		});
	}

}

function showErrorMessage(message)
{
	// html
	var error = "<div class='information-panel'>\
		<div class='information-dismiss'>x</div>\
		<div class='information-message'>"+ message +"</div>\
	</div>"

	// add it to dom
	$("body").prepend(error);

	// create handler for close icon
	$(".information-panel").click(function(){
		removeFromDom(".information-panel");
	});

}

function removeFromDom(what)
{
	$(what).fadeOut(function(){
		$(this).remove();
	});
}