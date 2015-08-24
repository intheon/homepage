$(document).ready(function(){
	// globalTime is blank and global and 
	// will contain a crap ton of stuff
	var globalTime 		= {};
	var globalData 		= {};
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
			$("."+monthLowercase+"Calendar").append("<div class='calendar-item calendar-item-"+cellLoop+"'><div class='ui dropdown'><i class='dropdown icon'></i><div class='menu'><div class='item show-modal' id='purchase-modal'><i class='money icon'></i>New Purchase</div><div class='item show-modal' id='diary-modal''><i class='calendar icon'></i>New Diary entry</div></div></div><div class='date-number'>"+cellLoop+"</div><div class='day-label'>"+day+"</div></div>");
		}
	}

	// register dropdown handler
	$('.ui.dropdown').dropdown();

	// instill modal when clicked
	$(".dropdown .item").click(function(event){

		// create the blasted modal

		$("body").append("<div class='ui modal'><i class='close icon'></i><div class='header modal-header'></div><div class='content'><div class='ui fluid form'><div class='fields'></div></div></div><div class='actions'><div class='ui inverted black button' id='cancel-modal'>Cancel</div><div class='ui inverted orange button' id='add-item-modal'>Add</div></div>");

		// start making some preliminary object info
		// this will ultimately be the values which get populated into the master object
		// this will only get applied when 'add' is clicked

		var updatedPayload  = {
			actionType: 			event.currentTarget.id,
			yearIdentifier: 		event.currentTarget.parentNode.parentElement.parentElement.parentElement.parentElement.dataset.yearLabel,
			monthIdentifier: 		event.currentTarget.parentNode.parentElement.parentElement.parentElement.parentElement.dataset.monthLabel,
			dayIdentifier: 			(function(){
										var dayId = event.currentTarget.parentNode.parentElement.parentElement.className;
											dayId = dayId.split(" ");
											dayId = dayId[1];
										return dayId;
									}(event))
		};

		// can either have a modal for adding spending or a diary event
		// need to make sure the title, view, and behaviour reflects that
		var content, title = "";
		if (updatedPayload.actionType == "purchase-modal")
		{
			title = "Add Spend";
			content = "<div id='spending-field' class='modal-form-wrapper'><div class='field modal-field'><label>Thing bought</label><input type='text' placeholder='Label' id='spending-item-name'></div><div class='field modal-field'><label>Cost</label><input type='text' placeholder='Price' id='spending-item-desc'></div></div>";
		}
		else
		{
			title = "Add Diary";
			content = "<div id='diary-field' class='modal-form-wrapper'><div class='field modal-field'><label>Event name</label><input type='text' placeholder='Name' id='diary-item-name'></div><div class='field modal-field'><label>Event information</label><input type='text' placeholder='Description' id='diary-item-desc'></div></div>";
		}

		$(".ui.modal .modal-header").html(title);
		$(".ui.modal .content .fields").html(content);
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

				// remove modal from dom to stop duplicate values from appearing.
				$(".ui.dimmer.modals").fadeOut("slow", function(){
					$(this).remove();
				});
			}
		});


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
		ajaxHandler(httpMethod, phpFile, payload.files[keys].filename, classMethod, objectName, payload.files[keys].propName,null);
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
										spendItems: [{"label" : payload.label, "price": payload.detail}]
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

	console.log(toWrite);

	ajaxHandler("POST", "./php/module_file_manager.php", "complex.json", "addToFile", "globalData", "historical",toWrite);

	//console.log(payload);
	//console.log(globalData);
}


function ajaxHandler(httpMethod,phpFile,filename,classMethod,objName,propName,data)
{
	// a reusable ajax handler for doing some php stuff to objects
	$.ajax({
		type				: httpMethod,
		url                 : phpFile,
		data 				: 
		{
			filename        : filename,
			method   		: classMethod,
			data            : data
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
	console.log(asJSON);

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
