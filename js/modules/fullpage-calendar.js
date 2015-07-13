// draws several calendars

$(document).ready(function(){
	time = {};
	defineMetadata(time);
});

function defineMetadata(time)
{
	time.thisMonthAsInt 				= parseInt(moment().format("M"));
	time.thisMonthAsObj					= moment(time.thisMonthAsInt,"M");
	time.oneMonthAgo 					= moment(time.thisMonthAsInt - 1,"M");
	time.twoMonthsAgo 					= moment(time.thisMonthAsInt - 2,"M");
	time.oneMonthFromNow 				= moment(time.thisMonthAsInt + 1,"M");
	time.twoMonthsFromNow 				= moment(time.thisMonthAsInt + 2,"M");
	time.threeMonthsFromNow 			= moment(time.thisMonthAsInt + 3,"M");
	time.fourMonthsFromNow 				= moment(time.thisMonthAsInt + 4,"M");

	time.quantToDisplay 				= [time.twoMonthsAgo,time.oneMonthAgo,time.thisMonthAsObj,time.oneMonthFromNow,time.twoMonthsFromNow,time.threeMonthsFromNow,time.fourMonthsFromNow];

	drawCalendars(time);

}

function drawCalendars(time)
{
	var monthsToDraw = time.quantToDisplay.length;

	for (i = 0; i <= monthsToDraw - 1; i++)
	{
		var monthLowercase 		= time.quantToDisplay[i].format("MMMM").toLowerCase();
		var daysInThisMonth 	= time.quantToDisplay[i].daysInMonth();

		$(".modal-calendar").append("<div class='calendar-month'>\
				<h2>"+time.quantToDisplay[i].format("MMMM")+"</h2>\
				<div class='calendar-month-body' id='"+monthLowercase+"Cal'></div>\
			</div>");

		for (d = 1; d <= daysInThisMonth; d++)
		{
			$("#"+monthLowercase+"Cal").append("<div class='calendar-item' id='calendar-item-"+d+"'>\
			<div class='cell-menu'><img src='../homepage/img/note.png' class='button-add' id='button-note' width='22%'><img src='../homepage/img/paper-bill.png' width='22%' class='button-add' id='button-spend'></div>\
			<div class='date-number'>"+d+"<div class='day-label'></div></div>\
			<div class='date-body'></div></div>");
		}
	}

}