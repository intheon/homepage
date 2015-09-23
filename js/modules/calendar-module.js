var Calendar = {

	initialise: function(type){
		// define some useful metadata
		var time = {
			today: 							moment(),
			todaysDayAsInt: 				parseInt(moment().format("D")),
			thisMonthAsInt: 				parseInt(moment().format("M")),
			thisYearAsInt: 					parseInt(moment().format("YYYY")),
			thisMonthAsObj:   				moment(this.thisMonthAsInt,"M"),
			thisMonthAsPhrase: 				moment().format("MMMM"),
			thisMonthAsPhraseLower: 		moment().format("MMMM").toLowerCase(),
			quantToDisplay: 				(function(){
												var momentBuilder = function(offset){
													return moment().month(parseInt(moment().format("M") - 1) + offset);
												};

												var array = (type == "full") ? [momentBuilder(-2), momentBuilder(-1), momentBuilder(+0), momentBuilder(+1), momentBuilder(+2), momentBuilder(+3), momentBuilder(+4), momentBuilder(+5)] : [momentBuilder(+0)];
												return array;
											})(type)
		};

		// UX stuffffew
		if (type == "complex") scrollToElement();

		this.renderCal(time);
	},

	renderCal: function(time){

		_.each(time.quantToDisplay, function(arrItem){
			console.log(arrItem);
		});

	},
		/*

	// for each month
	for (var loop = 0; loop < globalTime.quantToDisplay.length; loop++)
	{
		// shorthand vars
		var year 			= globalTime.quantToDisplay[loop].format("YYYY");
		var month			= globalTime.quantToDisplay[loop].format("MMMM");
		var monthLowercase 	= globalTime.quantToDisplay[loop].format("MMMM").toLowerCase();
		var daysInThisMonth = globalTime.quantToDisplay[loop].daysInMonth();

		$(".modal-calendar").append("<div class='ui raised segment'><div class='month-section' data-month-number='"+globalTime.quantToDisplay[loop]._i+"' data-month-label='"+month+"' data-year-label='"+year+"'><h3>"+month+"</h3><div class='month-section-body "+monthLowercase+"Calendar'></div><div class='month-section-footnotes'></div></div></div>");
		
		// for each day in the month
		for (var cellLoop = 1; cellLoop <= daysInThisMonth; cellLoop++)
		{
			var day = moment(cellLoop,"D");
				day = day.format("dd");
			$("."+monthLowercase+"Calendar").append("<div class='calendar-item calendar-item-"+cellLoop+"'><div class='ui dropdown'><i class='dropdown icon'></i><div class='menu'><div class='item show-modal' id='purchase-modal'><i class='money icon'></i>New Purchase</div><div class='item show-modal' id='diary-modal'><i class='calendar icon'></i>New Diary entry</div><div class='item show-modal' id='stats-modal'><i class='tasks icon'></i>Statistics</div></div></div><div class='date-number'>"+cellLoop+"</div><div class='day-label'>"+day+"</div></div>");
		}
	}

	// register dropdown handler
	$('.ui.dropdown').dropdown();

	// instill modal when clicked
	$(".dropdown .item").click(function(event){
		createModals(event);
	});

	// now that our calendar is drawn, populate it with data
	assignData(globalTime);
	*/

	scrollToElement: function(){
		$("html, body").animate({
			scrollTop: $("div [data-month-label='"+globalTime.thisMonthAsPhrase+"']").offset().top + +40
		},1100);
	},

};



/*
$(document).ready(function(){
	// globalTime is blank and global and 
	// will contain a crap ton of stuff
	var globalTime 		= {};
	var globalData 		= {};

	var Calendar = {

		initialise: function(type)
		{
			var time = 
			{
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

			return time;
		},

		render: function(type)
		{
			console.log(type);
			//console.log(Calendar.initialise());
		}

	};


	//Calendar.render();
});

/*


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

	if (type == "complex")
	{
		$("html, body").animate({
		scrollTop: $("div [data-month-label='"+globalTime.thisMonthAsPhrase+"']").offset().top + +40
		},1100);
	}

}

function drawCalendars(globalTime)
{
	// dynamically draws a calendar for each month 
	// based upon each property in 'globalTime'

	// for each month
	for (var loop = 0; loop < globalTime.quantToDisplay.length; loop++)
	{
		// shorthand vars
		var year 			= globalTime.quantToDisplay[loop].format("YYYY");
		var month			= globalTime.quantToDisplay[loop].format("MMMM");
		var monthLowercase 	= globalTime.quantToDisplay[loop].format("MMMM").toLowerCase();
		var daysInThisMonth = globalTime.quantToDisplay[loop].daysInMonth();

		$(".modal-calendar").append("<div class='ui raised segment'><div class='month-section' data-month-number='"+globalTime.quantToDisplay[loop]._i+"' data-month-label='"+month+"' data-year-label='"+year+"'><h3>"+month+"</h3><div class='month-section-body "+monthLowercase+"Calendar'></div><div class='month-section-footnotes'></div></div></div>");
		
		// for each day in the month
		for (var cellLoop = 1; cellLoop <= daysInThisMonth; cellLoop++)
		{
			var day = moment(cellLoop,"D");
				day = day.format("dd");
			$("."+monthLowercase+"Calendar").append("<div class='calendar-item calendar-item-"+cellLoop+"'><div class='ui dropdown'><i class='dropdown icon'></i><div class='menu'><div class='item show-modal' id='purchase-modal'><i class='money icon'></i>New Purchase</div><div class='item show-modal' id='diary-modal'><i class='calendar icon'></i>New Diary entry</div><div class='item show-modal' id='stats-modal'><i class='tasks icon'></i>Statistics</div></div></div><div class='date-number'>"+cellLoop+"</div><div class='day-label'>"+day+"</div></div>");
		}
	}

	// register dropdown handler
	$('.ui.dropdown').dropdown();

	// instill modal when clicked
	$(".dropdown .item").click(function(event){
		createModals(event);
	});

	// now that our calendar is drawn, populate it with data
	assignData(globalTime);
}

function createModals(event)
{
	// create a blank modal
	$("body").append("<div class='ui modal' id='modal'><i class='close icon'></i><div class='header modal-header'></div><div class='modal-content'><div class='ui fluid form'><div class='fields'></div></div></div><div class='actions'><div class='ui inverted black button' id='cancel-modal'>Cancel</div><div class='ui inverted orange button' id='add-item-modal'>Add</div></div>");

	// super useful stuff
	var updatedPayload  = {
		actionType: 			event.currentTarget.id,
		yearIdentifier: 		event.currentTarget.parentNode.parentElement.parentElement.parentElement.parentElement.dataset.yearLabel,
		monthIdentifier: 		event.currentTarget.parentNode.parentElement.parentElement.parentElement.parentElement.dataset.monthLabel,
		dayIdentifier: 			(function(){
									var dayId = event.currentTarget.parentNode.parentElement.parentElement.className;
										dayId = dayId.split(" ");
										dayId = dayId[1];
										dayId = dayId.split("-");
										dayId = dayId[2];
									return dayId;
								}(event))
		};

		
		// can either have a modal for adding spending or a diary event
		// need to make sure the title, view, and behaviour reflects that
		var content, title = "";

		switch (updatedPayload.actionType)
		{
			case "purchase-modal":
				title = "Add Spend";
				content = "<div id='spending-field' class='modal-form-wrapper'><div class='field modal-field'><label>Thing bought</label><input type='text' placeholder='Label' id='spending-item-name'></div><div class='field modal-field'><label>Cost</label><input type='text' placeholder='Price' id='spending-item-desc'></div></div>";
				break;

			case "diary-modal":
				title = "Add Diary";
				content = "<div id='diary-field' class='modal-form-wrapper'><div class='field modal-field'><label>Event name</label><input type='text' placeholder='Name' id='diary-item-name'></div><div class='field modal-field'><label>Event information</label><input type='text' placeholder='Description' id='diary-item-desc'></div></div>";
				break;

			case "stats-modal":
				title = "Overview for day";
				content = "<div id='stats-overview>Some useful stats here</div>";
				var matchingDays = returnMatchingDay(updatedPayload.yearIdentifier, updatedPayload.monthIdentifier, updatedPayload.dayIdentifier);

					if (matchingDays !== null)
					{
						$("#add-item-modal").fadeOut();
						$(".modal-content").html("<div class='ui two column middle aligned very relaxed stackable grid' id='stats-display'></div>");
						for (keys in matchingDays)
						{
							var object = matchingDays[keys];

							if (keys == "events")
							{
								$("#stats-display").append("<div class='column' id='events'><div class='ui horizontal statistic'><div class='value'>"+object.totalDayEvents+"</div><div class='label'>Events today</div></div><div class='ui divided very relaxed list' id='events-todo'></div></div>");
								for (events in matchingDays[keys].dayEventItems)
								{
									$("#events-todo").append("<div class='item'>"+matchingDays[keys].dayEventItems[events].label+"</item>")
								}
							}
							if (keys == "spending")
							{
								$("#stats-display").append("<div class='column' id='spending'><div class='ui horizontal statistic'><div class='value'>£"+object.totalDaySpend+"</div><div class='label'>Spent today</div></div><div class='ui divided very relaxed list' id='spending-list'></div></div>");
								for (spends in matchingDays[keys].spendItems)
								{
									$("#spending-list").append("<div class='item'>"+matchingDays[keys].spendItems[spends].label+" | £"+matchingDays[keys].spendItems[spends].price+"</item>");
								}
							}
						}
					}
					else if (matchingDays === null)
					{
						$(".modal-content").html("<h3>No stats to show!</h3>");
						$("#add-item-modal").fadeOut();
						$("#cancel-modal").fadeOut();
					}

				break;

			default:
				console.log("lol b0rked");
				break;
		}

		$(".ui.modal .modal-header").html(title);
		$(".ui.modal .modal-content .fields").html(content);
		$('.ui.modal').modal('show');

		$(".ui.modal .actions .button").click(function(event){

			var type = event.currentTarget.id;

			if (type == "add-item-modal") 
			{	
				var id = $(".modal-form-wrapper")[0].id;
				var split = id.split("-");

				// TODO VALIDATION and make sure bounds and type is good
				var name = $("#" + split[0] +"-item-name").val();
				var detail = $("#" + split[0] +"-item-desc").val();

				updatedPayload.label = name;
				updatedPayload.detail = detail;

				// apply this new value to our huge json block
				writeDataToFile(updatedPayload,globalData);
			}
				// remove modal from dom to stop duplicate values from appearing.
				removeModalFromDom();
		});

		$("#modal .icon").click(function(){
			removeModalFromDom();
		});
		$("#modal .button").click(function(){
			removeModalFromDom();
		});
}

function removeModalFromDom()
{
	$("#modal").fadeOut("slow", function(){
		$("#modal").remove();
		$(".ui.dimmer.modals").remove()
	});
}

function assignData(globalTime)
{
	// our raw data to play with
	var jsonData = {};
	// our request payload to the server

	var payload = {
		files: [{filename: "complex.json", propName: "historical"}]
	};

	// this takes a while to do its thing
	getDataFromFile("POST", "./php/module_file_manager.php", payload, "readFile", jsonData, "complex");

	// listening to the object
	// only works on chrome, but i dont give a shit about other browsers
	// 'ajaxHandler' ajax onSuccess assignment statement gets this handler to fire
	Object.observe(jsonData,function(whatChanged){
		parseObject(whatChanged[0].object,globalTime)
	});

}

function getDataFromFile(httpMethod,phpFile,payload,classMethod,objectName, flag)
{
	// payload is an object with filenames, and the object properties to assign the contents of the filename to.
	// objectName is the root object to assign this to
	for (keys in payload.files)
	{
		ajaxHandler(httpMethod, phpFile, payload.files[keys].filename, classMethod, objectName, payload.files[keys].propName, null, flag);
	}
}

function writeDataToFile(payload,globalData)
{
	// dont cry... !
	var toWrite = globalData;
	// compare globalData against payload
	// merge if matching values
	// add if doesn't exist

	// find this year
	for (var years in toWrite.items)
	{
		// all this does is match 2015 == 2015, 2016 == 2016 etc
		if (parseInt(Object.keys(toWrite.items[years])[0]) == payload.yearIdentifier)
		{
			// current
			var currentYearObj = toWrite.items[years][payload.yearIdentifier];

			for (var months in currentYearObj.monthlyBreakdown)
			{
				if (months == payload.monthIdentifier)
				{
					// update the month spend if it was a spending item
					if (payload.actionType ==  "purchase-modal")
					{
						// update monthly spend
						// this is horrible... i know - but at least it's dynamic!!
						toWrite.items[years][payload.yearIdentifier].monthlyBreakdown[months].monthSpend = +currentYearObj.monthlyBreakdown[months].monthSpend + +payload.detail;

						// turns 'calendar-item-4' into '4'
						var dayIdAsInt = payload.dayIdentifier;
							dayIdAsInt = dayIdAsInt.split("-");
							dayIdAsInt = dayIdAsInt[2];

						for (days in currentYearObj.monthlyBreakdown[months].daySpends)
						{
							// testing for existing properties/days
							if (days == dayIdAsInt)
							{
								var newObj = {
									label: payload.label,
									price: payload.detail
								}
								// do something to append
								toWrite.items[years][payload.yearIdentifier].monthlyBreakdown[months].daySpends[days].spendItems.push(newObj);
								toWrite.items[years][payload.yearIdentifier].monthlyBreakdown[months].daySpends[days].totalDaySpend = +currentYearObj.monthlyBreakdown[months].daySpends[days].totalDaySpend + +payload.detail;
							}
							else
							{
								Object.defineProperty(toWrite.items[years][payload.yearIdentifier].monthlyBreakdown[months].daySpends,dayIdAsInt,{
									value: {
										spendItems: [{"label" : payload.label, "price": payload.detail}],
										totalDaySpend: payload.detail
									},
									enumerable: true,
									writeable: true
								});
								break;
							}
						}
					}
					else if (payload.actionType ==  "diary-modal")
					{
						// something
					}
				}
			}
		}
	}

	Object.observe(toWrite,function(whatChanged){
		console.log("something happened");
		console.log(whatChanged);
		parseObject(whatChanged[0].object,globalTime)
	});

	console.log(typeof toWrite);

	ajaxHandler("POST", "./php/module_file_manager.php", "complex.json", "addToFile", "globalData", "historical", toWrite , "complex");
	parseObject(toWrite,globalTime)
}


function ajaxHandler(httpMethod,phpFile,filename,classMethod,objName,propName,data,flag)
{
	// a reusable ajax handler for doing some php stuff to objects
	$.ajax({
		type				: httpMethod,
		url                 : phpFile,
		data 				: 
		{
			filename        : filename,
			method   		: classMethod,
			data            : data,
			flag            : flag
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

	globalData = asJSON;

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

// all these dig down into the obj and return the matching data
function returnMatchingYear(year)
{
	var toOperate = globalData;
	for (items in toOperate)
	{
		for (keys in toOperate[items])
		{
			var actualKeys = Object.keys(toOperate[items][keys]);
			for (var i = 0; i < keys.length; i++)
			{
				if (parseInt(actualKeys[i]) == year)
				{
					// we have it johnson
					return toOperate[items][keys][year];
				}

			}
		}
	}
}

function returnMatchingMonth(year, month)
{
	// params = year, month
	// first get the yearly object
	var yearObj = returnMatchingYear(year);
	// then cycle through and exposes ALL monthly objects
	for (months in yearObj.monthlyBreakdown)
	{	
		if (months == month)
		{
			// we have it!
			return yearObj.monthlyBreakdown[month];
		}
	}
}


function returnMatchingDay(year, month, day)
{
	// params = year, month, day
	// first get the monthly object
	var monthObj = returnMatchingMonth(year, month);
	// then cycle through and exposes ALL daily objects

	// there's two things we need: the spends and the events
	var theSpends = monthObj.daySpends;
	var theEvents = monthObj.dayEvents;

	var dayActivities = {};

	// we only care about ones for our day arguments
	for (days in theSpends)
	{
		if (parseInt(days) == day)
		{
			dayActivities.spending = theSpends[day];
			break;
		}
	}
	for (days in theEvents)
	{
		if (parseInt(days) == day)
		{
			dayActivities.events = theEvents[day];
			break;
		}
	}

	if ($.isEmptyObject(dayActivities))
	{
		return null;
	}
	else
	{
		return dayActivities;
	}
}

*/