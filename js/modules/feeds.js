// the feed engine

var rootUrl = "http://localhost/homepage";
//var rootUrl = "http://intheon.uk/home";

// params for this function are:
// - url
// - id of element to be inserted into
// - quantity of results

if (!internetStatus)
{
	$(".feed").append("<div class='offline-message'>Offline!</div>");
}
else
{
	//getFeed("http://feeds.sydv.net/latest-bash-quotes","bash",1);
	getFeed("http://feeds.bbci.co.uk/news/technology/rss.xml","bbc",7);
	getFeed("http://www.reddit.com/r/skateboarding/.rss","reddit",5);
	getFeed("http://clientsfromhell.tumblr.com/rss","clients",5);
	getFeed("http://www.gamespot.com/feeds/reviews/","gamespot",6);
	getFeed("http://preshing.com/feed/","preshing",6);
	getFeed("http://feeds.feedburner.com/codinghorror","coding",6);
}



// this accepts urls of valid feeds and sends them to php (module_get_feed)
function getFeed(websiteUrl,tag,limit)
{
	$.ajax({
		url: rootUrl + "/php/module_get_feed.php",
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
			$("#"+changes[0].name).append("<a href='"+obj[keys].link+"' target='_blank' class='item'>"+obj[keys].title+"</a>");
		}
	}
}