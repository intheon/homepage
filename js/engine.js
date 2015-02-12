$(document).ready(function(){
	$(".area").hide();
	$("#home").show();
});

$(".nav div").click(function(event){
	$(".area").hide();
	
	var id = $(this)[0].id;
		id = id.substr(0,id.length-5);

		$("#"+id).hide().fadeIn();
});