// the feed engine

// params for this function are:
// - url
// - id of element to be inserted into
// - quantity of results
getFeed("http://feeds.sydv.net/latest-bash-quotes","bash",1);


// this accepts urls of valid feeds and sends them to php (module_get_feed)
function getFeed(websiteUrl,tag,limit)
{
	$.ajax({
		url: rootDir + "php/module_get_feed.php",
		type: "POST",
		data: {
			website: websiteUrl,
			quant: limit,
			tagline: tag
		},
		success: function(response)
		{
			xmlResponses[tag] = response
		}
	});
}

// because everything is async, im making my own listener to act upon it
var xmlResponses = {};
Object.observe(xmlResponses,function(changes){
	detectChanges(changes);
});

// this just parses whatevers in the object
function detectChanges(changes)
{
	var obj = JSON.parse(xmlResponses[changes[0].name]);

	if (changes[0].name == "bash")
	{
		$("#"+changes[0].name).append("<p>"+obj[0].description+"</p>");
	}
	else
	{
		for (keys in obj)
		{
			$("#"+changes[0].name).append("<p><a href='"+obj[keys].link+"' target='_blank'>"+obj[keys].title+"</p></a>");
		}
	}
}