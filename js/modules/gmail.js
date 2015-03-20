// event listener to fire the authorisation needed to load the google api
$("#login_link").click(function(){
	authoriseGoogle();
});

// configuration
function authoriseGoogle()
{
	var configuration = {
		"client_id": "535339840289-c48nuh2v603viqsga9fmhbl91koak691.apps.googleusercontent.com",
		"scope": "https://www.googleapis.com/auth/gmail.readonly"
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
	// this will give a huge json block of all the messages in my inbox (identfied with their own id)
	var request = gapi.client.request({
		"path": "/gmail/v1/users/allobon@gmail.com/messages",
		"params": {"q": "in:inbox"}
	});

		// a promise is returned, and either a success or failure handler is executed
		request.then(function(response){onSuccess(response)}, function(response){onFailure(response)});

		function onSuccess(response)
		{
			// a blank holding array that will take all the messages when they are gathered.
			var inboxMessagesContents = [];

			// an array of all our messages currently in my inbox
			var inboxMessagesIds = response.result.messages;

			// loop through all, and assign only the interesting stuff to an object
			for (i = 0; i < inboxMessagesIds.length; i++)
			{
				var pointer = i;

				var requestMessage = gapi.client.request({
					"path": "/gmail/v1/users/allobon@gmail.com/messages/" + inboxMessagesIds[pointer].id,
					"params": {"format": "full"}
				});

				// a promise is returned when the request is completed
				requestMessage.then(function(response){

					var inboxMessagesContents.push(response);
			console.log(inboxMessagesContents);


					// the actual amount of headers changes every time, which is annoying
					// so now i have to search through every header to find one with a name of "Subject"

					/*
					emailMetadata.id 		= response.result.id;
					emailMetadata.snippet	= response.result.snippet;
					emailMetadata.plaintext	= response.result.payload.parts[0].body.data;
					emailMetadata.fullHTML	= response.result.payload.parts[1].body.data;

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
				}, function(reason){
					console.log("error: " + reason.result.error.message);
				});

			} // end for loop

			console.log(inboxMessagesContents);

		}

		// fired when I cant get a response at all - seems rare
		function onFailure(response)
		{
			console.log(response);
		}
}