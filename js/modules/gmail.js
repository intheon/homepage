// event listener to fire the authorisation needed to load the google api
$("#login_link").click(function()
{
	authoriseGoogle();
});

var arrayOfMessages = [];

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

	delayLoad();
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
	// parse means extract the bits i want and put in an object, and ignore the rest
	var message = {};

	// pretty standard
	message.id 					= response.result.id;
	message.snippet				= response.result.snippet;

	// the following extracts the actual message
	// not all email messages have a "parts" sub object
	// therefor loop through and identify if they have one. if not, its a level up
	// remember these are base64urlencoded
	for (keys in response.result.payload)
	{
		if (keys == "parts")
		{
			message.contents = response.result.payload.parts[0].body.data;
		}
		else
		{
			message.contents = response.result.payload.body.data;
		}
	}

	// now the subject line...
	// thankfully headers is pretty standard
	for (length = 0; length < response.result.payload.headers.length; length++)
	{
		if (response.result.payload.headers[length].name == "Subject")
		{
			message.subject = response.result.payload.headers[length].value;
		}
	}

	arrayOfMessages.push(message);

}

function delayLoad()
{
	// because im too stupid to find out how async js, lets use a timeout!
	// my "message" object takes a second or two before it's actually populated... soooo....

	$("#gmailContent").append("<div id='gmailLoading'><div class='ui active inverted dimmer'><div class='ui text loader'>Retreiving...</div></div>");


	setTimeout(function(){
		$(".integer_count").html("(" + arrayOfMessages.length + ")");
		$("#emailCount").html(arrayOfMessages.length);

		$("#gmailLoading").fadeOut(function(){

			$(this).hide();

			$("#gmailContent").append("<div class='ui divided very relaxed list' id='emailOutput'></div>");

			for (messagePointer = 0; messagePointer < arrayOfMessages.length; messagePointer++)
			{
				var msg = arrayOfMessages[messagePointer];
				var snippet = msg.snippet;
					snippet = snippet.substr(24,103);

				$("#emailOutput").append("<div class='item'><i class='star icon'></i><div class='content'><div class='header'>"+msg.subject+"</div>..."+snippet+"...</div></div>");
			}
		})


	},2000);
}