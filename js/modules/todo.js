// to control the view, modification, and addition of things to do

// simple. initialisation.
$(document).ready(function(){
	loadTodoList();
	retrieveFromInterwebs()
});

// registers an event listener
function loadTodoList()
{
	$("#todo").append("<div class='ui form'>\
		<div class='inline fields pp'>\
		<div id='outstandingTodos'></div>\
			<div class='field'>\
				<label>New todo?</label>\
				<input placeholder='wat?' type='text' id='todoInput'>\
			</div>\
			<div class='field'>\
				<div class='ui positive button' id='todoSubmit'>Submit</div>\
			</div>\
		</div>\
	</div>");

	$("#todoSubmit").click(function(){
		var itemToStore = $("#todoInput").val();
			$("#todoInput").val("");
		jsonify(itemToStore);
	});

	$("#todoInput").keyup(function(event){
		if (event.keyCode == 13)
		{
			var itemToStore = $("#todoInput").val();
				$("#todoInput").val("");
			jsonify(itemToStore);
		}
	});

}

// function jsonify - takes a string of characters and converts it to json
// also adds a timestamp
function jsonify(item)
{
	if (item == "")
	{
		console.log("this function has been called");
		return
	}
	else
	{
		var jsonItem = {};

		jsonItem.itemName = item;
		jsonItem.date = new Date();

		sendToInterwebs(jsonItem,"new");
	}

}

// ajax this to php
function sendToInterwebs(jsonItem,flag)
{
	$.ajax({
		type				: "POST",
		url                 : rootDir + "php/module_manage_todo.php",
		data 				: 
		{
			json   			: jsonItem,
			flag			: flag
		},
		success				: function(jsonString)
		{
			//console.log(jsonString);
			retrieveFromInterwebs();
		}
	});
}

// grab the entire string back from the json file
function retrieveFromInterwebs()
{
	$.ajax({
		type				: "GET",
		url                 : rootDir + "php/module_manage_todo.php",
		data 				: 
		{
			get   			: true
		},
		success				: function(jsonString)
		{
			//console.log(jsonString);
			writeToPage(jsonString);
		}
	});
}

// plonk on the page
function writeToPage(jsonString)
{
	var jsonString = JSON.parse(jsonString);

	$("#outstandingTodos").html("");
	$("#outstandingTodos").append("<div class='ui divided very relaxed list' id='outstandingTodosContent'></div>");
	for (property in jsonString)
	{
		for (items in jsonString[property])
		{
			var name = jsonString[property][items].itemName;
			var date = jsonString[property][items].date;
				date = date.substr(0,date.length-29);
			$("#outstandingTodosContent").append("<div class='item' data-number='"+items+"'><i class='star icon'></i><div class='content'><div class='header'>"+name+"</div><div class='smallText'>"+date+"</div></div></div>");
			$("#taskCount").html(parseInt(items) + 1);
		}
	}

	$(".item .icon").click(function(e){

		handleDelete(e,jsonString);

	});
}

function handleDelete(e,jsonString)
{
		var clickedIdentifier = e.currentTarget.parentElement.dataset.number;

		jsonString.items.splice(clickedIdentifier,1);

		if ($("#outstandingTodosContent > div").length - 1 == 0)
		{
			jsonString.items = '';
			$("#outstandingTodos").html("");
			$("#taskCount").html("0");

			sendToInterwebs(jsonString.items,"deleteFile");
		}
		else
		{
			sendToInterwebs(jsonString.items,"deleteItem");
		}


}