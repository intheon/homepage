// draws several calendars

$(document).ready(function(){

	time 		= {};
	money 		= {};
	raw			= {};

	defineMetadata(time,money,raw);
});

function defineMetadata(time,money,raw)
{
	time.todaysDate 					= moment().format("D");
	time.monthNum						= parseInt(moment().format("M"));
	time.todaysDate 					= parseInt(moment().format("D"));
	time.thisMonthAsInt 				= parseInt(moment().format("M"));
	time.thisMonthAsPhrase				= moment().format("MMMM").toLowerCase();
	time.thisMonthAsObj					= moment(time.thisMonthAsInt,"M");
	time.oneMonthAgo 					= moment(time.thisMonthAsInt - 1,"M");
	time.twoMonthsAgo 					= moment(time.thisMonthAsInt - 2,"M");
	time.oneMonthFromNow 				= moment(time.thisMonthAsInt + 1,"M");
	time.twoMonthsFromNow 				= moment(time.thisMonthAsInt + 2,"M");
	time.threeMonthsFromNow 			= moment(time.thisMonthAsInt + 3,"M");
	time.fourMonthsFromNow 				= moment(time.thisMonthAsInt + 4,"M");

	time.quantToDisplay 				= [time.twoMonthsAgo,time.oneMonthAgo,time.thisMonthAsObj,time.oneMonthFromNow,time.twoMonthsFromNow,time.threeMonthsFromNow,time.fourMonthsFromNow];

	drawCalendars(time,money,raw);

}

var alreadyHasModal 	= [];

function drawCalendars(time,money,raw)
{
	var monthsToDraw 	= time.quantToDisplay.length;
	getDataFromFile("history.json","history");
	getDataFromFile("notes.json","notes");
	getDataFromFile("spend.json","spend");
	drawBlankCal(time,raw,monthsToDraw);

	Object.observe(raw,function(changes){
		if (changes[0].name == "history") listHistoricalSpendByMonth(changes[0].object,time,raw);

		else if (changes[0].name == "notes") attributeNotesToCells(changes[0].object,time,raw);

		else if (changes[0].name == "spend") attributeSpendToCells(changes[0].object,time,raw);

	});

	function drawBlankCal(time,raw,monthsToDraw)
	{
		for (i = 0; i <= monthsToDraw - 1; i++)
		{
			var monthLowercase 		= time.quantToDisplay[i].format("MMMM").toLowerCase();
			var daysInThisMonth 	= time.quantToDisplay[i].daysInMonth();

			$(".modal-calendar").append("<div class='calendar-month' data-month-number='"+time.quantToDisplay[i]._i+"'>\
					<h2>"+time.quantToDisplay[i].format("MMMM")+"</h2>\
					<div class='calendar-month-body "+monthLowercase+"Cal'></div>\
				</div>");

			for (d = 1; d <= daysInThisMonth; d++)
			{

				$("."+monthLowercase+"Cal").append("<div class='calendar-item calendar-item-"+d+"'>\
				<div class='cell-menu'><img src='../homepage/img/note.png' class='button-add button-note' width='22%'><img src='../homepage/img/paper-bill.png' width='22%' class='button-add button-spend'></div>\
				<div class='date-number'>"+d+"<div class='day-label'></div></div>\
				<div class='date-body'></div></div>");


				$("."+monthLowercase+"Cal .calendar-item-" + d)
					.mouseover(function(event){
						var allClassNames = event.currentTarget.className;
						var uniqueClassName = allClassNames.split(" ")[1];

						var allClassesParent = event.currentTarget.parentElement.className;
						var uniqueParentClass = allClassesParent.split(" ")[1];
						$("." + uniqueParentClass + " ." + uniqueClassName + " .cell-menu").show();
				})
					.mouseout(function(event){
						var allClassNames = event.currentTarget.className;
						var uniqueClassName = allClassNames.split(" ")[1];

						var allClassesParent = event.currentTarget.parentElement.className;
						var uniqueParentClass = allClassesParent.split(" ")[1];
						$("." + uniqueParentClass + " ." + uniqueClassName + " .cell-menu").hide();
				});

				$("."+monthLowercase+"Cal .calendar-item-" + d + " .button-add").click(function(event){

					var allClassNames = event.currentTarget.parentNode.parentNode.className;
					var uniqueClassName = allClassNames.split(" ")[1];

					var allButtonClasses = event.currentTarget.className;
					var buttonClassType = allButtonClasses.split(" ")[1];
					var type	= buttonClassType;
					var cont 	= undefined;
					if (alreadyHasModal[0] === undefined || null)
					{
						alreadyHasModal.push(uniqueClassName)
						drawModal(uniqueClassName,type,time,money,event);
					}
					else
					{
						if (alreadyHasModal[0] == uniqueClassName) return false
						else 
						{
							for (on = 0; on <= alreadyHasModal.length - 1; on++)
							{	
								if (alreadyHasModal[on] == uniqueClassName)
								{
									cont = false;
									break;
								}
							}
							if (cont !== false)
							{
								alreadyHasModal.push(uniqueClassName);
								drawModal(uniqueClassName,type,time,money,event);
							}
						}
					}
				});
			}
		}

		$("." + time.thisMonthAsPhrase + "Cal .calendar-item-" + time.todaysDate).append("<div class='calendar-label'>Today</div>");
		$("." + time.thisMonthAsPhrase + "Cal .calendar-item-" + time.todaysDate).addClass("active-cell");
		$(".calendar-item-28").append("<div class='calendar-label'>Payday</div>");
	}

	function drawModal(whoRang,type,time,money,event)
	{	
		var fullParentClassName = event.currentTarget.parentElement.parentNode.offsetParent.lastElementChild.className;
		var parentShort = fullParentClassName.split(" ")[1];

		if (type == "button-note")
		{
			$("." + parentShort + " ." + whoRang).prepend("<div class='modal-overlay'><div class='modal-overlay-close'><img src='../homepage/img/cross.png'></div><div class='modal-overlay-add'><img src='../homepage/img/add.png' class='button-add-note'></div><form><textarea placeholder='add...'></textarea></form></div>");
		}
		else if (type == "button-spend")
		{
			$("." + parentShort + " ." + whoRang).prepend("<div class='modal-overlay ui form'><div class='modal-overlay-close'><img src='../homepage/img/cross.png'></div><div class='modal-overlay-add'><img src='../homepage/img/add.png' class='button-add-spend'></div><form><input type='text' placeholder='label' class='add-spend-label'><input type='text' placeholder='integer' class='add-spend-integer'></form></div>");
		}

		$("." + whoRang).keyup(function(event){
			if (event.keyCode == 13 && type == "button-note")
			{	
				var rawValue = event.target.value;
				var allClassNames = event.currentTarget.className;
				var parentCell = allClassNames.split(" ")[1];
				getModalValue(rawValue,parentCell,time,money,event);
			}
		});

		$(".button-add-spend").click(function(event){
			var allClassNames = event.currentTarget.offsetParent.offsetParent.offsetParent.className;
			var parentCell = allClassNames.split(" ")[1];
			var classes = [];

			$("." + whoRang + " input[type='text']").each(function(){
				classes.push(this.className);
			});

			getFormValue(parentCell,classes[0],classes[1],time,money)
		});

		$(".button-add-note").click(function(event){

			var allClassNames = event.currentTarget.offsetParent.offsetParent.offsetParent.className;
			var parentCell = allClassNames.split(" ")[1];
			var rawValue = $("." + parentCell + " .modal-overlay form textarea").val();
			
			getModalValue(rawValue,parentCell,time,money,event)
		});


		$("." + whoRang + " input[type='text']").keyup(function(event){
			if (event.keyCode == 13)
			{
				var classes = [];

				$("." + whoRang + " input[type='text']").each(function(){
					classes.push(this.className);
				});

				var allClassNames = event.currentTarget.offsetParent.offsetParent.className;
				var parentCell = allClassNames.split(" ")[1];
				getFormValue(parentCell,classes[0],classes[1],time,money,event);
			}
		});


		$(".modal-overlay-close").click(function(event){
			var allClassNames = event.currentTarget.offsetParent.offsetParent.className;
			var parentCell = allClassNames.split(" ")[1];
			removeModal(parentCell);
		});
	}

}

function getFormValue(parentCell,firstField,secondField,time,money,event)
{

	// takes the amount of spend and adds it to a json file
	// also, evaluates it for great success
	//var firstField = formId.currentTarget.previousElementSibling.previousElementSibling.className;
	//var secondField = formId.currentTarget.previousElementSibling.className;
	//var rootId = formId.currentTarget.offsetParent.offsetParent.id;

	var firstFieldVal = $("." + parentCell + " .modal-overlay form .add-spend-label").val()
	var secondFieldVal = $("." + parentCell + " .modal-overlay form .add-spend-integer").val()
	
	if (firstFieldVal == "" || secondFieldVal == "") showWarning("fill out all fields");
	else 
	{
		if (isNaN(secondFieldVal)) showWarning("this isnt a number!");
		else
		{
			// submit to json file + immediately retrieve
			setSpend(parentCell,firstFieldVal,secondFieldVal,time,money,event);

			// count how much
			money.spendThisMonth += parseInt(secondFieldVal);

			// persistence
			removeModal(parentCell);
		}
	}
}

function getModalValue(rawValue,parentCell,time,money,event)
{
	var tidyValue = rawValue.replace(/[^\w\s!?]/g,'');

	var noteHTML = "<div class='note'><div class='pin'></div>" + tidyValue + "</div>"

	setNotes(parentCell,noteHTML,time,money,event);

	removeModal(parentCell);
}

function setSpend(parentCell,firstFieldVal,secondFieldVal,time,money,event)
{

	var jsonItem = {
		parentCell 	: parentCell,
		label 		: firstFieldVal,
		integer 	: secondFieldVal,
		year 		: time.year,
		month 		: event.currentTarget.offsetParent.offsetParent.offsetParent.dataset.monthNumber
	};

	// set the spend in a file
	$.ajax({
		type				: "POST",
		url                 : "./php/module_file_manager.php",
		data 				: 
		{
			filename        : "spend.json", 
			method			: "addToFile",
			data   			: jsonItem
		},
		success				: function(response)
		{
			getDataFromFile("spend.json","spend");
		}
	});
}

function setNotes(parentCell,noteHTML,time,money,event)
{

	var jsonItem = {
		parentCell				: parentCell,
		noteHTML				: noteHTML,
		year					: time.year,
		month 					: event.currentTarget.lastElementChild.offsetParent.offsetParent.dataset.monthNumber
	};

	// set the note in a file
	$.ajax({
		type				: "POST",
		url                 : rootDir + "php/module_file_manager.php",
		data 				: 
		{
			filename        : "notes.json", 
			method			: "addToFile",
			data   			: jsonItem
		},
		success				: function(response)
		{
			getDataFromFile("notes.json","notes");
		}
	});

}

function attributeNotesToCells(rawData,time,raw)
{
	if (rawData.notes != "file doesnt exist")
	{
		var asJSON = JSON.parse(rawData.notes);

		for (i = 0; i <= asJSON.items.length - 1; i++)
		{
			var monthToMatch 	= asJSON.items[i].month;
			var cellToMatch 	= asJSON.items[i].parentCell;
			var noteHTML 		= asJSON.items[i].noteHTML;
			$("div [data-month-number='"+monthToMatch+"'] ."+cellToMatch+" .date-body").html("");
			$("div [data-month-number='"+monthToMatch+"'] ."+cellToMatch+" .date-body").append(noteHTML);
		}
	}
}

function attributeSpendToCells(rawData,time,money)
{	
	if (rawData.spend != "file doesnt exist")
	{
		var asJSON = JSON.parse(rawData.spend);
		console.log(rawData);
		for (i = 0; i <= asJSON.items.length - 1; i++)
		{
			var monthToMatch 	= asJSON.items[i].month;
			var cellToMatch 	= asJSON.items[i].parentCell;
			var label 			= asJSON.items[i].label;
			var integer 		= asJSON.items[i].integer;
			$("div [data-month-number='"+monthToMatch+"'] ."+cellToMatch+" .date-body").html("");
			$("div [data-month-number='"+monthToMatch+"'] ."+cellToMatch+" .date-body").append("<div class='spend-item'><div class='pin'></div><div class='spend-label'>" + label + "</div><div class='spend-value'>£" + integer + "</div></div>");
			// money.spendThisMonth += +(integer);
			// ?
		}
	}
}

function listHistoricalSpendByMonth(rawData,time,raw)
{
	var asJSON = JSON.parse(rawData.history);

	for (i = 0; i <= asJSON.items.length - 1; i++)
	{
		var monthToMatch 	= asJSON.items[i].monthNumber;
		var wageAmount 		= asJSON.items[i].wageAmount;

		$("div [data-month-number='"+monthToMatch+"'] h2").append("<h3>(£"+wageAmount+")</h3>");
	}
}

function getDataFromFile(file,propName)
{
	$.ajax({
		type				: "POST",
		url                 : "./php/module_file_manager.php",
		data 				: 
		{
			filename        : file,
			method   		: "readFile",
			data            : null
		},
		success				: function(data)
		{
			raw[propName] = data;
		}
	});
}

function removeModal(parentCell)
{
	var fullParentClassName = event.currentTarget.parentElement.parentNode.offsetParent.lastElementChild.className;
	var parentShort = fullParentClassName.split(" ")[1];

	$("." + parentShort + " ." + parentCell + " .modal-overlay").fadeOut(function(){
		$(this).remove();
	});

	var index = alreadyHasModal.indexOf(parentCell);

	if (index > -1) {
    	alreadyHasModal.splice(index, 1);
	}

	$("." + parentShort + " ." + parentCell).unbind("keyup");
}

function writeToCalendar(jsonString,type,time,money)
{
	if (jsonString != "file doesnt exist")
	{
		var jsonString = JSON.parse(jsonString);
	
		for (property in jsonString)
		{
			for (items in jsonString[property])
			{
				if (type == "notes")
				{
					var parent = jsonString[property][items].parentCell;
					var noteHTML = jsonString[property][items].noteHTML;

					$("." + parent + " .date-body").html("");
					$("." + parent + " .date-body").append(noteHTML);
				}
				else if (type == "spend")
				{
					var parent = jsonString[property][items].parentCell;
					var label = jsonString[property][items].label;
					var integer = jsonString[property][items].integer;

					money.spendThisMonth += +(integer);

					$("." + parent + " .date-body").append("<div class='spend-item'><div class='pin'></div><div class='spend-label'>" + label + "</div><div class='spend-value'>£" + integer + "</div></div>");
				}
			}
		}
	}
}