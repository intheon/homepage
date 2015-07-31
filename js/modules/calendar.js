// -------------------------------------------------------------
// 						Workflow
//					  2015 intheon
//
// 	-	Draw a blank calendar with moment.js
// 	-	Check if net wage for that month is available.
// 	-	Have form to add in spend
// 	-	Have information panel to show how much remains
//
// -------------------------------------------------------------

// initialisation
$(document).ready(function()
{
// globals
	var time 			= {};
	var money 			= {};

// functions
	defineMetadata(time,money);
	loadCalendar(time,money);
});

// defining useful stuff as objects
function defineMetadata(time,money)
{
// time
	time.today 				= moment();
	time.year 				= moment().year();
	time.month 				= moment().format("MMMM");
	time.monthNum			= moment().format("M");
	time.todaysDate 		= moment().format("D");
	time.fullDate 			= moment().format("YYYY-MM-DD");
	time.dayShort 			= moment().format("ddd");
	time.firstDayOfMonth 	= moment(1,"D");
	time.daysInMonth 		= moment().daysInMonth();
	time.payday 			= moment().date("28");
	time.toPayday 			= time.payday.diff(time.today,"days");
// money
	getMonthInfo(time,money);

	money.spendThisMonth 	= 0;
	money.netPay            = null;

// object-listener
	Object.observe(money,function(changes){
		loadInformation(time,money);
	});
}

// actually draws the calendar to the dom
function loadCalendar(time,money)
{
	$("#cost-calendar").attr("data-month-number",time.monthNum)
	// draw all the dates
	for (counter = 1; counter <= time.daysInMonth; counter++)
	{
		var day = moment(counter,"D");
			day = day.format("dd");

		$("#cost-calendar").append("<div class='calendar-item calendar-item-"+counter+"'>\
			<div class='cell-menu'><img src='./img/note.png' class='button-add button-note' width='22%'><img src='./img/paper-bill.png' width='22%' class='button-add button-spend'></div>\
			<div class='date-number'>"+counter+"<div class='day-label'>"+day+"</div></div>\
			<div class='date-body'></div></div>");

		if (counter == time.todaysDate)
		{
			$(".calendar-item-" + counter).append("<div class='calendar-label'>Today</div>");
			$(".calendar-item-" + counter).addClass("active-cell");
		}

		if (counter == 28)
		{
			$(".calendar-item-28").append("<div class='calendar-label'>Payday</div>");
		}

		$(".calendar-item-" + counter)
			.mouseover(function(event){

				var allClassNames = event.currentTarget.className;
				var uniqueClassName = allClassNames.split(" ")[1];

				$("." + uniqueClassName + " .cell-menu").show();
			})
			.mouseout(function(event){
				var allClassNames = event.currentTarget.className;
				var uniqueClassName = allClassNames.split(" ")[1];

				$("." + uniqueClassName + " .cell-menu").hide();
			})

		$(".calendar-item-" + counter + " .button-add").click(function(event){
			var allClassNames = event.currentTarget.parentNode.parentNode.className;
			var uniqueClassName = allClassNames.split(" ")[1];

			var allButtonClasses = event.currentTarget.className;
			var buttonClassType = allButtonClasses.split(" ")[1];
			var type	= buttonClassType;
			var cont 	= undefined;

			if (alreadyHasModal[0] === undefined || null)
			{
				alreadyHasModal.push(uniqueClassName)
				drawModal(uniqueClassName,type,time,money);
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
						drawModal(uniqueClassName,type,time,money);
					}
				}
			}
		});
	};
	getNotes(time,money);
	getSpend(time,money);
}

// and draws all the helpful bits of motivational information
function loadInformation(time,money)
{
	var remaining = parseInt(money.netPay - money.spendThisMonth);
	
	$("#information-panel").html("<div class='information-wrapper'>\
		<div class='information-month information-row'>"+time.month+"</div>\
		<div class='information-next-payday information-row'><div class='integer'>"+time.toPayday+"</div> days until payday</div>\
		<div class='information-payday-amount information-row'><div class='integer'>£"+money.netPay+"</div> wage this month</div>\
		<div class='information-month-spend information-row'><div class='integer'>£"+ money.spendThisMonth +"</div> spent this month</div>\
		<div class='information-wage-remaining information-row'><div class='integer'>£"+ parseInt(money.netPay - money.spendThisMonth) +"</div> remains</div>\
		<div class='information-wage-daily-spend information-row'><div class='integer'>£"+ parseInt(money.spendThisMonth / time.daysInMonth)  +"</div> spending per day</div>\
		<div class='information-wage-daily information-row'><div class='integer'>£"+ parseInt(remaining / time.daysInMonth)  +"</div> allowance per day</div>\
		<div class='information-show-year information-row'><a class='' href='year-outlook.html' target='_blank'>Show year</a></div>\
	</div>");

	$("#moneyCount").html("£" + parseInt(money.netPay - money.spendThisMonth));

	var toEvaluate = {
		remaining: ["information-wage-remaining",parseInt(money.netPay - money.spendThisMonth)],
		spend: ["information-month-spend", money.spendThisMonth]
	};

	calculateColour(toEvaluate);

	//$("#calendar-item-28 .date-body").append("£"+money.netPay);
}


function calculateColour(subjects)
{
	if (subjects.spend[1] >= 100)
	{
		
	}

}


var alreadyHasModal = [];


function drawModal(whoRang,type,time,money)
{
	if (type == "button-note")
	{
		$("." + whoRang).prepend("<div class='modal-overlay'><div class='modal-overlay-close'><img src='./img/cross.png'></div><div class='modal-overlay-add'><img src='./img/add.png' class='button-add-note'></div><form><textarea placeholder='add...'></textarea></form></div>");
	}
	else if (type == "button-spend")
	{
		$("." + whoRang).prepend("<div class='modal-overlay ui form'><div class='modal-overlay-close'><img src='./img/cross.png'></div><div class='modal-overlay-add'><img src='./img/add.png' class='button-add-spend'></div><form><input type='text' placeholder='label' class='add-spend-label'><input type='text' placeholder='integer' class='add-spend-integer'></form></div>");
	}

	$("." + whoRang).keyup(function(event){
		if (event.keyCode == 13 && type == "button-note")
		{	
			var rawValue = event.target.value;
			var allClassNames = event.currentTarget.className;
			var parentCell = allClassNames.split(" ")[1];
			getModalValue(rawValue,parentCell,time,money);
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
		
		getModalValue(rawValue,parentCell,time,money)
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
			getFormValue(parentCell,classes[0],classes[1],time,money);
		}
	});


	$(".modal-overlay-close").click(function(event){
		var allClassNames = event.currentTarget.offsetParent.offsetParent.className;
		var parentCell = allClassNames.split(" ")[1];
		removeModal(parentCell);
	});
}

function removeModal(parentCell)
{

	$("." + parentCell + " .modal-overlay").fadeOut(function(){
		$(this).remove();
	});

	var index = alreadyHasModal.indexOf(parentCell);

	if (index > -1) {
    	alreadyHasModal.splice(index, 1);
	}

	$("." + parentCell).unbind("keyup");
}

function getModalValue(rawValue,parentCell,time,money)
{
	var tidyValue = rawValue.replace(/[^\w\s!?]/g,'');

	var noteHTML = "<div class='note'><div class='pin'></div>" + tidyValue + "</div>"

	setNotes(parentCell,noteHTML,time,money);

	removeModal(parentCell);
}

function getFormValue(parentCell,firstField,secondField,time,money)
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
			setSpend(parentCell,firstFieldVal,secondFieldVal,time,money);

			// count how much
			money.spendThisMonth += parseInt(secondFieldVal);

			// persistence
			removeModal(parentCell);
		}
	}
}


function showWarning(message)
{
	$("#messages").html("<div class='warning-message'>" + message + " <div class='close-warning-box'><img src='../../img/cross.png' width='40%'></div></div>");

	$(".close-warning-box").click(function(){
		$(".warning-message").fadeOut(function(){
			$(this).remove();
		});
	});

}

function getMonthInfo(time,money)
{
	/*
		This is a bit of a weird one.

		I've decided to go with setting all the information about historic paydays
		into one json file. It used to be stored in a mysql db but i want to play with
		json files instead.

		The idea here is money.netPay is set by this function automatically.

		The calling function defineMetadata is listening for any changes with Object.observer
		which is awesome, but only available in ES6 and such just works in chrome for now.
	*/

	$.ajax({
		type				: "POST",
		url                 : "./php/module_file_manager.php",
		data 				: 
		{
			filename        : "history.json",
			method   		: "readFile",
			data            : null
		},
		success				: function(data)
		{
			setMonthInfo(time,money,data);
		}
	});


}
function setMonthInfo(time,money,data)
{
	/*
		the purpose of this block is to build a blocking front end to 
		prompt the user to give how much they got paid this month

		from there, it's submited to a json file
	*/

	if (data == "file doesnt exist")
	{
		setWageForMonth(time,money);
	}
	else
	{
		// cycles through the block and find the correct month amount
		var json = JSON.parse(data);

		for (property in json)
		{
			for (items in json[property])
			{
				if (time.year == json[property][items].year && time.monthNum == json[property][items].monthNumber)
				{
					money.netPay = json[property][items].wageAmount;
				}
			}
		}
	}
}

function getNotes(time,money)
{
	$.ajax({
		type				: "POST",
		url                 : "./php/module_file_manager.php",
		data 				: 
		{
			filename        : "notes.json",
			method   		: "readFile",
			data            : null
		},
		success				: function(jsonString)
		{
			writeToCalendar(jsonString,"notes",time,money);
		}
	});
}

function setNotes(parentCell,noteHTML,time,money)
{
	//var rootDir 		= "http://localhost/home/"; // local
  	var rootDir 		= "http://intheon.uk/home/"; // production

	var jsonItem = {};
		jsonItem.parentCell 	= parentCell;
		jsonItem.noteHTML 		= noteHTML;
		jsonItem.year 			= time.year;
		jsonItem.month 			= time.monthNum;

	
	// set the note in a file
	$.ajax({
		type				: "POST",
		url                 : "./php/module_file_manager.php",
		data 				: 
		{
			filename        : "notes.json", 
			method			: "addToFile",
			data   			: jsonItem
		},
		success				: function(response)
		{
			getNotes(time,money);
		}
	});
}

function getSpend(time,money)
{
	$.ajax({
		type				: "POST",
		url                 : "./php/module_file_manager.php",
		data 				: 
		{
			filename        : "spend.json",
			method   		: "readFile",
			data            : null
		},
		success				: function(jsonString)
		{
			writeToCalendar(jsonString,"spend",time,money);
		}
	});
}

function setSpend(parentCell,firstFieldVal,secondFieldVal,time,money)
{
	//var rootDir 			= "http://localhost/homepage/"; // local
  	var rootDir 			= "http://intheon.uk/home/"; // production

	var jsonItem = {};
		jsonItem.parentCell = parentCell;
		jsonItem.label 		= firstFieldVal;
		jsonItem.integer 	= secondFieldVal;
		jsonItem.year 		= time.year;
		jsonItem.month 		= time.monthNum;

		
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
			getSpend(time,money);
		}
	});
}


function setWageForMonth(time,money)
{
	$(document.body).prepend("<div class='overlay-wrapper'>\
		<div class='full-page-overlay'>\
			</div><div class='full-page-capture'><h2>Staph!</h2><h3>How much did you get paid this month?</h3>\
			<input type='text' placeholder='$$$$$' id='this-months-pay'>\
			<input type='button' value='Submit' id='submit-months-pay'>\
			</div></div>");

	$("#submit-months-pay").click(function(){
		var amount = $("#this-months-pay").val();

		if (amount == "") $("#this-months-pay").val("Please fill this out");
		else
		{
			if (!isNaN(amount))
			{
				if (amount <= 3000)
				{
					var jsonItem = {};
						jsonItem.date 			= time.fullDate;
						jsonItem.monthNumber 	= time.monthNum;
						jsonItem.year			= time.year;
						jsonItem.wageAmount 	= amount;

					$.ajax({
						type				: "POST",
						url     			: "./php/module_file_manager.php",
						data 				: 
						{
							filename        : "history.json", 
							method			: "addToFile",
							data   			: jsonItem
						},
						success	: function(data)
						{
							$(".overlay-wrapper").fadeOut(function(){
								$(".overlay-wrapper").hide();
							});
							getMonthInfo(time,money);
						}
						});
				}
				else
				{
					$("#this-months-pay").val("Are you rich?");
				}
			}
			else
			{
				$("#this-months-pay").val("NaN");
			}
		}
	});
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
					var cellToMatch = jsonString[property][items].parentCell;
					var monthToMatch = jsonString[property][items].month;
					var noteHTML = jsonString[property][items].noteHTML;

					$("." + parent + " .date-body").html("");
					$("div [data-month-number='"+monthToMatch+"'] ."+cellToMatch+" .date-body").append(noteHTML);
				}
				else if (type == "spend")
				{
					var parent = jsonString[property][items].parentCell;
					var label = jsonString[property][items].label;
					var integer = jsonString[property][items].integer;

					money.spendThisMonth += +(integer);
					
					$("." + parent + " .date-body").html("");
					$("." + parent + " .date-body").append("<div class='spend-item'><div class='pin'></div><div class='spend-label'>" + label + "</div><div class='spend-value'>£" + integer + "</div></div>");
				}
			}
		}
	}
	loadInformation(time,money);
}