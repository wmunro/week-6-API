$(document).ready(function() {
$("#Comedians").html("");
// array of comedians
var comedians =['Steve Harvey','Jim Carey','Steve Martin','Chris Rock'];
// console.log(comedians)


// creating giph buttons
function renderButtons(){

	$("#giphButtons").empty();

	for (var i = 0; i < comedians.length; i++) {
		

		var a = $("<button>");
		a.addClass("items");
		a.attr("data-name", comedians[i]);
		a.text(comedians[i]);
		$("#giphButtons").append(a);
	}
}
// creating a function to add new Buttons

$('#submit').on('click', function(){


	var items = $('#comedian-input').val().trim();

	comedians.push(items);

	renderButtons();

	return false;
});

// }

// function for displaying the comedians
function displayComedianInfo(){

// queryURL info	
var singleComedian = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + singleComedian + "&api_key=dc6zaTOxFJmzC&limit=10";
	console.log(this);
	console.log(queryURL);
	console.log(singleComedian);


$.ajax({url: queryURL, method: 'GET'})
.done(function(response) {
console.log(response);
// empty list so it doesnt show previous giphs
         $("#Comedians").empty();
          

        var results = response.data;
        if(results == ""){
        	document.write("No Giphs for that search.");

        }
        for (var i=0; i<results.length; i++) {

        	var giphDiv = $("<div>"); //div for giphs to go into
    		giphDiv.addClass("giphDiv");
        	// rating info from queryURL
        	var giphRating = $("<p>").text("Rating: " + results[i].rating); 
        	giphDiv.append(giphRating);

        	var giphImage = $("<img>");
        	giphImage.attr("src", results[i].images.fixed_height_still.url); 
        	giphImage.attr("data-still", results[i].images.fixed_height_still.url); 
        	giphImage.attr("data-animate", results[i].images.fixed_height.url); 
        	giphImage.attr("data-state", "still"); 
        	giphImage.addClass("images");
        	giphDiv.append(giphImage);

        	$("#Comedians").prepend(giphDiv);
        	$("#giphDiv").empty();
        	}	
		
	

        });

		}

displayComedianInfo();
renderButtons();


// event listeners
$(document).on("click", ".items", displayComedianInfo);
$(document).on("click", ".images", function(){

	var state = $(this).attr('data-state');

	if ( state == 'still'){
		$(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');

	}

	else{
		$(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
	}
});
});

