// to control the view, modification, and addition of things to do

$(document).ready(function(){
	loadTodoList();
});

function loadTodoList()
{

	$("#todo").append("<div class='ui form'>\
		<div class='inline fields'>\
			<div class='field'>\
				<label>New todo?</label>\
				<input placeholder='wat?' type='text'>\
			</div>\
			<div class='field'>\
				<div class='ui labeled button'>Submit</div>\
			</div>\
		</div>\
	</div>");

	/*
	$("#todo").append("<div class='ui form'>
		<div class='inline fields'>\
		<div class='ui labeled input field' id='emptyToDo'>\
			<label class='ui label'>New?</label>\
			<input class='ui field' placeholder='wat?' type='text' id='emptyToDoField'>\
		</div>\
		<div class='field'>\
			<div class='ui labeled button' id='submitButton'>Submit</div>\
		</div>\
				</div>\
		</div>");

*/
}

