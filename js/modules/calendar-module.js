$(document).ready(function(){
	// globalTime is blank and global and 
	// will contain a crap ton of stuff
	var globalTime 		= {};
});

function loadCalendar(type)
{
	// 'type' tells the calendar how many months to show.
	globalTime = {
		today: 							moment(),
		todaysDayAsInt: 				parseInt(moment().format("D")),
		thisMonthAsInt: 				parseInt(moment().format("M")),
		thisMonthAsObj:   				moment(this.thisMonthAsInt,"M"),
		thisMonthAsPhrase: 				moment().format("MMMM").toLowerCase(),
		quantToDisplay: 				(function(){
											var array = (type == "full") ? [moment((parseInt(moment().format("M")) - 2),"M"), moment((parseInt(moment().format("M")) - 1),"M"), moment((parseInt(moment().format("M"))),"M"), moment((parseInt(moment().format("M")) + 1),"M"), moment((parseInt(moment().format("M")) + 2),"M"), moment((parseInt(moment().format("M")) + 3),"M"), moment((parseInt(moment().format("M")) + 4),"M"), moment((parseInt(moment().format("M")) + 5),"M")] : [moment((parseInt(moment().format("M"))),"M")];
											return array;
										})(type)
	};

	drawCalendars(globalTime);
}

function drawCalendars(globalTime)
{
	// dynamically draws a calendar for each month 
	// based upon each property in 'globalTime'

	// for each month
	for (var loop = 0; loop < globalTime.quantToDisplay.length - 1; loop++)
	{
		// shorthand vars
		var monthLowercase 	= globalTime.quantToDisplay[loop].format("MMMM").toLowerCase();
		var daysInThisMonth = globalTime.quantToDisplay[loop].daysInMonth();

		$(".modal-calendar").append("<div class='ui raised segment'><div class='month-section' data-month-number='"+globalTime.quantToDisplay[loop]._i+"'><h3>"+globalTime.quantToDisplay[loop].format("MMMM")+"</h3><div class='month-section-body "+monthLowercase+"Calendar'></div></div>");
		
		// for each day in the month
		for (var cellLoop = 1; cellLoop <= daysInThisMonth; cellLoop++)
		{
			var day = moment(cellLoop,"D");
				day = day.format("dd");
			$("."+monthLowercase+"Calendar").append("<div class='calendar-item calendar-item-"+cellLoop+"'><div class='ui dropdown'><i class='dropdown icon'></i><div class='menu'><div class='item show-modal purchase'><i class='money icon'></i>New Purchase</div><div class='item show-modal diary'><i class='calendar icon'></i>New Diary entry</div></div></div><div class='date-number'>"+cellLoop+"</div><div class='day-label'>"+day+"</div></div>");
		}
	}

	// register dropdown handler
	$('.ui.dropdown').dropdown();

	// instill modal when clicked
	$(".dropdown .item").click(function(){$('.ui.modal').modal('show')});

	// now that our calendar is drawn, populate it with data
	assignData(globalTime);
}

function assignData(globalTime)
{
	// our raw data to play with
	var jsonData = {};

	// our request payload to the server
	var payload = {
		files: [{filename: "history.json", propName: "history"}, {filename: "notes.json", propName: "notes"}, {filename: "spend.json", propName: "spend"}]
	};

	// this doesnt execute immediately!
	getDataFromFile("POST", "./php/module_file_manager.php", payload, "readFile", jsonData);

	// therefore listen to the object for changes
	// chrome only, but i dont give a shit

	// 'ajaxHandler' ajax onSuccess assignment statement gets this handler to fire
	Object.observe(jsonData,function(whatChanged){
		if (whatChanged[0].name == "spend") assignSpendToCells(whatChanged[0].object);
	});

}

function getDataFromFile(httpMethod,phpFile,payload,classMethod,objectName)
{
	// payload is an object with filenames, and the object properties to assign the contents of the filename to.
	// objectName is the root object to assign this to
	for (keys in payload.files)
	{
		ajaxHandler(httpMethod, phpFile, payload.files[keys].filename, classMethod, objectName, payload.files[keys].propName);
	}
}


function ajaxHandler(httpMethod,phpFile,filename,classMethod,objName,propName)
{
	// a reusable ajax handler for doing some php stuff to objects
	$.ajax({
		type				: httpMethod,
		url                 : phpFile,
		data 				: 
		{
			filename        : filename,
			method   		: classMethod,
			data            : null
		},
		success				: function(data)
		{
			objName[propName] = data;
		}
	});
}


function assignSpendToCells(jsonData)
{
	var asJSON = JSON.parse(jsonData.spend);

	var arrayOfTotals = calculateTotals(asJSON);

	//console.log(arrayOfTotals);
}

function calculateTotals(json)
{
	// we're gonna do two things; calculate how much happened per month, and per day

	var records = json.items;

	var totals = [];

	// per month
	// if it matches the same year and month
	// merge the values together and store

	for (var i = 0; i < records.length; i++)
	{
		// always needs an initial value
		if (totals.length === 0) console.log("nothing");

		totals.push(records[i].year);
		console.log(records[i].year);
		console.log(records[i].month);
		console.log(records[i].integer);
	}



	console.log(records);


	return json;
}
