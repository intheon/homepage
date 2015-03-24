// to control the view, modification, and addition of things to do

$(document).ready(function(){
	loadTodoList();
});

function loadTodoList()
{
	$("#todo").append("<div class='inline field'><label>Enter something new</label><input placeholder='What?' type='text'></div>")
}

