// event listener to fire the authorisation needed to load the google api

$("#login_link").click(function(){
	authoriseGoogle();
});

function authoriseGoogle()
{
	var configuration = {
		"client_id": "535339840289-c48nuh2v603viqsga9fmhbl91koak691.apps.googleusercontent.com",
		"scope": "https://www.googleapis.com/auth/gmail.readonly"
	};

	gapi.auth.authorize(configuration, function(){
		loadGmailApi();
	});
}

function loadGmailApi()
{
	// make a REST request to googles servers
	// this will give a huge json block of all the messages in my inbox
	// each email has it's own id, which is handy because we need 
	var request = gapi.client.request({
		"path": "/gmail/v1/users/allobon@gmail.com/messages",
		"params": {"q": "in:inbox"}
	});

		// a promise is returned, and either a success or failure handler is executed
		request.then(function(response){onSuccess(response)}, function(response){onFailure(response)});

		function onSuccess(response)
		{
			// an array of all our messages currently in my inbox
			var inboxMessagesIds = response.result.messages;

			// a blank holding array that will take all the messages when they are gathered.
			var inboxMessagesContents = [];

			// loop through all, and grab the headers/content for that specific email id
			for (i = 0; i <= inboxMessagesIds.length; i++)
			{
				var requestMessage = gapi.client.request({
					"path": "/gmail/v1/users/allobon@gmail.com/messages/" + inboxMessagesIds[1].id,
					"params": {"format": "full"}
				});

				// a promise is returned when the request is completed
				requestMessage.then(function(response){
			var base64 = response.result.payload.parts[1].body.data;

			//console.log(base64);
			console.log("base64: " + base64.substr(0,14) + "...");
			console.log("decoded: " + base64_decode(base64));
		}, function(reason){
			console.log("error: " + reason.result.error.message);
		});
			}

			//console.log("i believe this has been completed...?");
			//console.log(inboxMessagesContents);
		}

		function onFailure(response)
		{
			console.log(response);
		}
}