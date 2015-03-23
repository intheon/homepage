// event listener to fire the authorisation needed to load the google api
$("#login_link").click(function()
{
	authoriseGoogle();
});

var arr = [];

/*
var emailMetadata = {};
Object.observe(emailMetadata, function(changes){
	console.log(changes);
});

*/

// configuration
function authoriseGoogle()
{
	var configuration = {
		"client_id"			: "535339840289-c48nuh2v603viqsga9fmhbl91koak691.apps.googleusercontent.com",
		"scope"				: "https://www.googleapis.com/auth/gmail.readonly"
	};

	gapi.auth.authorize(configuration, function(){
		$("#login_container").fadeOut(function(){
			$(this).hide();
		});

		loadGmailApi();
	});
}

function loadGmailApi()
{
	// make a REST request to googles servers
	// this will give a huge json block of all the messages in my inbox (identified with their own id)
	var request = gapi.client.request({"path": "/gmail/v1/users/allobon@gmail.com/messages","params": {"q": "in:inbox"}});

	// a promise is returned, and either a success or failure handler is executed
	request.then(function(response){onSuccess(response)}, function(response){onFailure(response)});
}

function onSuccess(response)
{
	// an array of all our messages currently in my inbox
	var inboxMessagesIds = response.result.messages;

	// loop through all, and assign only the interesting stuff to an object
	for (i = 0; i < inboxMessagesIds.length; i++)
	{
		var requestMessage = gapi.client.request({
			"path": "/gmail/v1/users/allobon@gmail.com/messages/" + inboxMessagesIds[i].id,
			"params": {"format": "full"}
		});
		requestMessage.then(function(response){parseMessage(response)}, function(reason){console.log("error: " + reason.result.error.message)});
	}

	// a promise is returned when the request is completed
}

function onFailure(response)
{
	console.log(response);
}

function parseMessage(response)
{
	var message = {};

	// pretty standard
	message.id 					= response.result.id;
	message.snippet				= response.result.snippet;

	for (properties = 0; properties < response.result.payload.length; properties++)
	{
		if (response.result.payload[property] == "parts")
		{
			// not always included
			message.contents	= response.result.payload.parts[0].body.data;
		}
		else
		{
			// this seems to be the alternate
			message.contents	= response.result.payload.body.data;
		}
	}

	console.log(message);
}


					//emailMetadata.emailNum4 = arrayWrapper;
/*
					//console.log(emailMetadata);
					
					for (length = 0; length < response.result.payload.headers.length; length++)
					{
						if (response.result.payload.headers[length].name == "Subject")
						{
							emailMetadata.subject = response.result.payload.headers[length].value;
						}
					}

					inboxMessagesContents.push("test");

					console.log(inboxMessagesContents);

					// if you want to decode the base64url encoding use 'base64_decode(string)'

					*/

				// failure - cant actually get this to fire, but good to know it's there



// fired when I cant get a response at all - seems rare
