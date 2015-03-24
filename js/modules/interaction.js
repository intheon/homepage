$(document).ready(function(){
	$(".area").hide();
	$("#home").show();
});

$(".menu .item").click(function(event){
	$(".menu .item").removeClass("active");
	$(this).addClass("active");
	$(".area").hide();
	
	var id = $(this)[0].id;
		id = id.substr(0,id.length-5);

		$("#"+id).hide().fadeIn();
});