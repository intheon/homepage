// to control the view, modification, and addition of things to do

// simple. initialisation.
$(document).ready(function(){
	loadTodoList();
});

// registers an event listener
function loadTodoList()
{
	$("#todo").append("<div class='ui form'>\
		<div class='inline fields'>\
			<div class='field'>\
				<label>New todo?</label>\
				<input placeholder='wat?' type='text' id='todoInput'>\
			</div>\
			<div class='field'>\
				<div class='ui labeled button' id='todoSubmit'>Submit</div>\
			</div>\
		</div>\
		<div id='outstandingTodos'></div>\
	</div>");

	$("#todoSubmit").click(function(){
		var itemToStore = $("#todoInput").val();
		jsonify(itemToStore);
	});
}

// function jsonify - takes a string of characters and converts it to json
// also adds a timestamp
function jsonify(item)
{
	var jsonItem = {};

	jsonItem.itemName = item;
	jsonItem.date = new Date();

	sendToInterwebs(jsonItem);
}

// ajax this to php
function sendToInterwebs(jsonItem)
{
	$.ajax({
		type				: "POST",
		url                 : rootDir + "php/module_manage_todo.php",
		data 				: 
		{
			json   			: jsonItem
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
			writeToPage(jsonString);
		}
	});
}

// plonk on the page
function writeToPage(jsonString)
{
	var jsonString = JSON.parse(jsonString);
	$("#outstandingTodos").html("");
	for (property in jsonString)
	{
		for (items in jsonString[property])
		{
			var name = jsonString[property][items].itemName;
			var date = jsonString[property][items].date;

			$("#outstandingTodos").append("<h2>"+name+"</h2><p>"+date+"</p>");
		}
	}
}