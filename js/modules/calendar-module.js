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

	console.log(time.quantToDisplay);
}