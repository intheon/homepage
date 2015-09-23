$(document).ready(function(){

	$("#show-register").click(function(){
		showRegisterForm()
	});

	$("#register-details").click(function(){
		registerDetails();
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
		url: 	"http://localhost/homepage/php/module_manage_credentials.php",
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
