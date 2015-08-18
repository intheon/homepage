$(document).ready(function(){
	// time is blank and global and 
	// will contain a crap ton of stuff
	var time = {};
});

function loadCalendar(type)
{
	// 'type' tells the calendar how many months to show.
	time = {
		today: 							moment(),
		todaysDayAsInt: 				parseInt(moment().format("D")),
		thisMonthAsInt: 				parseInt(moment().format("M")),
		thisMonthAsObj:   				moment(this.thisMonthAsInt,"M"),
		thisMonthAsPhrase: 				moment().format("MMMM").toLowerCase(),
		quantToDisplay: (function(){
				var array = (type == "full") ? [moment((parseInt(moment().format("M")) - 2),"M"), moment((parseInt(moment().format("M")) - 1),"M"), moment((parseInt(moment().format("M"))),"M"), moment((parseInt(moment().format("M")) + 1),"M"), moment((parseInt(moment().format("M")) + 2),"M"), moment((parseInt(moment().format("M")) + 3),"M"), moment((parseInt(moment().format("M")) + 4),"M"), moment((parseInt(moment().format("M")) + 5),"M")] : [moment((parseInt(moment().format("M"))),"M")];
				return array;
		})(type)
	} 

	drawCalendars(time);
}

function drawCalendars(time)
{
	// dynamically draws a calendar for each month 
	// based upon each property in 'time'
	for (var loop = 0; loop < time.quantToDisplay.length - 1; loop++)
	{
		// shorthand vars
		var monthLowercase 	= time.quantToDisplay[loop].format("MMMM").toLowerCase();
		var daysInThisMonth = time.quantToDisplay[loop].daysInMonth();

		$(".modal-calendar").append("<div class='ui raised segment'><div class='month-section' data-month-number='"+time.quantToDisplay[loop]._i+"'><h3>"+time.quantToDisplay[loop].format("MMMM")+"</h3><div class='month-section-body "+monthLowercase+"Calendar'></div></div>");
		
		for (var cellLoop = 1; cellLoop <= daysInThisMonth; cellLoop++)
		{
			var day = moment(cellLoop,"D");
				day = day.format("dd");

			$("."+monthLowercase+"Calendar").append("<div class='calendar-item calendar-item-"+cellLoop+"'>\
					<div class='ui dropdown'>\
						<i class='dropdown icon'></i>\
						<div class='menu'>\
							<div class='item show-modal purchase'><i class='money icon'></i>New Purchase</div>\
							<div class='item show-modal diary'><i class='calendar icon'></i>New Diary entry</div>\
						</div>\
					</div>\
					<div class='date-number'>"+cellLoop+"</div>\
					<div class='day-label'>"+day+"</div>\
				</div>");
		}
	}

	$('.ui.dropdown').dropdown();

	$(".dropdown .item").click(function(){
		$('.ui.modal').modal('show');
	});

}