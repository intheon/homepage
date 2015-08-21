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
		thisYearAsInt: 					parseInt(moment().format("YYYY")),
		thisMonthAsObj:   				moment(this.thisMonthAsInt,"M"),
		thisMonthAsPhrase: 				moment().format("MMMM"),
		thisMonthAsPhraseLower: 		moment().format("MMMM").toLowerCase(),
		quantToDisplay: 				(function(){
											var array = (type == "full") ? [moment((parseInt(moment().format("M")) - 2),"M"), moment((parseInt(moment().format("M")) - 1),"M"), moment((parseInt(moment().format("M"))),"M"), moment((parseInt(moment().format("M")) + 1),"M"), moment((parseInt(moment().format("M")) + 2),"M"), moment((parseInt(moment().format("M")) + 3),"M"), moment((parseInt(moment().format("M")) + 4),"M"), moment((parseInt(moment().format("M")) + 5),"M")] : [moment((parseInt(moment().format("M"))),"M")];
											return array;
										})(type)
	};

	drawCalendars(globalTime);

	$("html, body").animate({
		scrollTop: $("div [data-month-label='"+globalTime.thisMonthAsPhrase+"']").offset().top + +40
	},1100);



}

function drawCalendars(globalTime)
{
	// dynamically draws a calendar for each month 
	// based upon each property in 'globalTime'

	// for each month
	for (var loop = 0; loop < globalTime.quantToDisplay.length - 1; loop++)
	{
		// shorthand vars
		var month	= globalTime.quantToDisplay[loop].format("MMMM");
		var monthLowercase 	= globalTime.quantToDisplay[loop].format("MMMM").toLowerCase();
		var daysInThisMonth = globalTime.quantToDisplay[loop].daysInMonth();

		$(".modal-calendar").append("<div class='ui raised segment'><div class='month-section' data-month-number='"+globalTime.quantToDisplay[loop]._i+"' data-month-label='"+month+"'><h3>"+month+"</h3><div class='month-section-body "+monthLowercase+"Calendar'></div><div class='month-section-footnotes'></div></div></div>");
		
		// for each day in the month
		for (var cellLoop = 1; cellLoop <= daysInThisMonth; cellLoop++)
		{
			var day = moment(cellLoop,"D");
				day = day.format("dd");
			$("."+monthLowercase+"Calendar").append("<div class='calendar-item calendar-item-"+cellLoop+"'><div class='ui dropdown'><i class='dropdown icon'></i><div class='menu'><div class='item show-modal' id='purchase-modal'><i class='money icon'></i>New Purchase</div><div class='item show-modal' id='diary-modal''><i class='calendar icon'></i>New Diary entry</div></div></div><div class='date-number'>"+cellLoop+"</div><div class='day-label'>"+day+"</div></div>");
		}
	}

	// register dropdown handler
	$('.ui.dropdown').dropdown();

	// instill modal when clicked
	$(".dropdown .item").click(function(){

		// can either have a modal for adding spending or a diary event
		// need to make sure the title, view, and behaviour reflects that
		// we ascertain which is which from this baby

		var type = event.currentTarget.id;

		var title = (type == "purchase-modal") ? "Add Spend" :  "Add Diary";

		$(".ui.modal .modal-header").html(title);

		$('.ui.modal').modal('show');

	});

	// now that our calendar is drawn, populate it with data
	assignData(globalTime);
}

function assignData(globalTime)
{
	// our raw data to play with
	var jsonData = {};

	// our request payload to the server
	/*
	var payload = {
		files: [{filename: "history.json", propName: "history"}, {filename: "notes.json", propName: "notes"}, {filename: "spend.json", propName: "spend"}]
	};
	*/
	var payload = {
		files: [{filename: "complex.json", propName: "historical"}]
	};

	// this takes a while to do its thing
	getDataFromFile("POST", "./php/module_file_manager.php", payload, "readFile", jsonData);

	// listening to the object
	// only works on chrome, but i dont give a shit about other browsers
	// 'ajaxHandler' ajax onSuccess assignment statement gets this handler to fire
	Object.observe(jsonData,function(whatChanged){
		parseObject(whatChanged[0].object,globalTime)
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

function parseObject(object,globalTime)
{
	var objName = Object.keys(object)[0];

	var asJSON = JSON.parse(object[objName]);

	// find this year
	for (var years in asJSON.items)
	{
		// all this does is match 2015 == 2015, 2016 == 2016 etc
		if (parseInt(Object.keys(asJSON.items[years])[0]) == globalTime.thisYearAsInt)
		{
			var currentYearObj = asJSON.items[years][globalTime.thisYearAsInt];
			//console.log(currentYearObj);
			for (var months in currentYearObj.monthlyBreakdown)
			{
				var monthlySpendsObj = currentYearObj.monthlyBreakdown[months].daySpends;
				var monthlyEventsObj = currentYearObj.monthlyBreakdown[months].dayEvents;
				// this assigns stuff to the cells

				// let's do spend first
				for (spend in monthlySpendsObj)
				{
					$("div [data-month-label='"+months+"'] .month-section-body .calendar-item-"+spend+"").append("<div class='ui label inverted green'><i class='pound icon'></i>"+monthlySpendsObj[spend].totalDaySpend+"</div>")
				}

				// now events
				for (events in monthlyEventsObj)
				{
					$("div [data-month-label='"+months+"'] .month-section-body .calendar-item-"+events+"").append("<div class='ui label red'><i class='calendar outline icon'></i>"+monthlySpendsObj[spend].totalDaySpend+"</div>")
				}

				
				// this draws some helpful info
				var monthSpend = currentYearObj.monthlyBreakdown[months].monthSpend;
				var wageEarned = currentYearObj.monthlyBreakdown[months].monthWage;
				var savings = +wageEarned - +monthSpend;
				$("div [data-month-label='"+months+"'] .month-section-footnotes").append("<div class='ui mini pink statistic'><div class='value'>"+monthSpend+"</div><div class='label'>Spent this month</div></div><div class='ui mini red statistic'><div class='value'>"+wageEarned+"</div><div class='label'>Earned this month</div></div><div class='ui mini blue statistic'><div class='value'>"+savings+"</div><div class='label'>Remaining</div></div>");
			}
			break;
		}
	}

	// to do... allow historic years
	// for (some code to do some shit)

}

function calculateTotals(json)
{
	// we're gonna do two things; calculate how much happened per month, and per day

/*
	var records = json.items;
	var monthRunningTotal = 0;

	var totals = [];

	var complexObject = [
		{
			2015: {
				totalSpend : 13400, 
				monthlyBreakdown : { 
					august : { 
						monthSpend : 2000,
						daySpends : {
							23 : {
								totalDaySpend: 45,
								spendItems: [{label: "dogs", price: 20},{label: "cheese", price: 25}]
							},
							14 : {
								totalDaySpend: 15,
								spendItems: [{label: "yams", price: 10},{label: "crackers", price: 25}]
							}
						}
					}, 
					july : { 
						monthSpend: 1230 
					}} 
				}
		}, { 
			2014: { 
				totalSpend : 12450, 
				monthlyBreakdown : { 
					june : { 
						monthSpend : 1234 
					}, 
					may : { 
						monthSpend : 1452 
					}}
		}}
	];

	console.log(complexObject);


	// per month
	// if it matches the same year and month
	// merge the values together and store

	for (var i = 0; i < records.length; i++)
	{
		var tempObject = {
			year: records[i].year,
			month: records[i].month,
			monthSpend: +records[i].integer
		}
		// always needs an initial value
		if (totals.length === 0) totals.push(tempObject);
		if (totals.length > 0) 
		{
			// checks for duplicate months
			for (var t = 0; t < totals.length; t++)
			{
				if (tempObject.year == totals[t].year && tempObject.month == totals[t].month)
				{
					// found one!
					monthRunningTotal += +tempObject.monthSpend;
					tempObject.monthSpend = monthRunningTotal;
				}
			}
		}
	}


	return json;
	*/
}
