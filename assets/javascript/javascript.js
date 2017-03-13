// This function will run upon the page loading
$(function(){
	initialBtn(topics,'searchButton','#locbttn');
	console.log("Start App");
})

// Lst of strings/items that will be used to populate the search terms to start out
var topics = ['Drones', 'Squids', 'Golf','Tennis','Racecar'];

// This function will take in a search array, class in every single button, and area which it will be adding to
function initialBtn(topics,classToAdd,areaToAddTo){
	// Must empty area everytime we add a new button (otherwise there will be duplicates)
	$(areaToAddTo).empty();
	for(var i=0; i < topics.length; i++){
		var a = $('<button>');
		a.addClass(classToAdd);
		a.attr('data-type',topics[i]);
		a.text(topics[i]);
		$(areaToAddTo).append(a);
	}
}

$(document).on('click','.searchButton',function(){
	$('#searches').empty();
	var	type = $(this).data('type');
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=dc6zaTOxFJmzC&limit=10';
	$.ajax({url:queryURL,method:'GET'})
		.done(function(response){
			for (var i = 0;i<response.data.length;i++) {
				var	searchDiv = $('<div class="search-item">');
				var rating = response.data[i].rating;
				var p = $('<p>').text('Rating: '+rating);
				var animated = response.data[i].images.fixed_height.url;
				var still = response.data[i].images.fixed_height_still.url;
				var image = $('<img>');
				image.attr('src',still);
				image.attr('data-still',still);
				image.attr('data-animated',animated);
				image.attr('data-state','still');
				image.addClass('searchImage');
				searchDiv.append(p);
				searchDiv.append(image);
				$('#searches').append(searchDiv);
			}
		})
})

// Animate the Images
$(document).on('click','.searchImage',function(){
	//replace attr instead of data to reset to still/animated and replaced state to data-state
	var state = $(this).attr('data-state');	
	if(state == 'still'){
		$(this).attr('src',$(this).data('animated'));
		$(this).attr('data-state','animated');
	}	else {
		$(this).attr('src',$(this).data('still'));
		$(this).attr('data-state','still');
	}
})

// Add New buttons 
$('#putNewSearch').on('click',function(){
	// grabs whatever is stored in the textbox and will place it in newSearch variable
	// (eq)Looking for an input for the first version of an input
	var newSearch = $('input').eq(0).val();
	topics.push(newSearch);
	initialBtn(topics,'searchButton','#locbttn');
	// since input type =Submit, it will attempt to reload the page (with orig) -to prevent from reloading the page
	return false;
})