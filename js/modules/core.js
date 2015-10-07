// defines global vars

$(document).ready(function() {
      $(".resizable-grid").shapeshift();

      $(".content-area").waypoint(function(event){
			console.log("fired");
			console.log(this);

      },{
      	triggerOnce: false
      });

 });



var internetStatus = (navigator.onLine ? true : false);



