$(document).ready(function () {

    // var API_key = "xoyEoew0BB2fCv8wecrgRj1tv9xS7FoV";
    // var topics = [];

    // This function loads gifs from pressing a button to the left
    $("button").on("click", function () {
        // sets the search term equal to the topic of this button. 
        var searchTerm = $(this).attr("data-topic");
        // This is the API URL we will use to get 10 gifs
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=xoyEoew0BB2fCv8wecrgRj1tv9xS7FoV&limit=10";

        //console.log($(this).attr("data-topic"));

        // AJAX call to get data
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // after AJAX gets data, do this...
            .then(function (response) {
                // Set a variable to a specific area for easier access
                var results = response.data;
                console.log(response);

                // a for loop for each gif
                for (var i = 0; i < results.length; i++) {
                    // adds a new div with class item for each gif
                    var gifDiv = $("<div class='item'>");

                    // takes the rating for the gif into variable
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);
                    
                    var polaroidDiv = $("<div class='item'>");
                    var polaroid = $("<img>");
                    polaroid.attr("src", "assets/images/polaroid.jpg")

                    // adds an img tag for the gif and sets up all classes/ids/data information for still/animation
                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height_still.url);
                    personImage.attr("data-still", results[i].images.fixed_height_still.url);
                    personImage.attr("data-animate", results[i].images.fixed_height.url);
                    personImage.attr("id","gif");
                    personImage.attr("data-state", "still");

                    // prepends all the information in order
                    
                    polaroid.prepend(p);
                    polaroid.prepend(personImage);
                    polaroidDiv.prepend(polaroid);
                    gifDiv.prepend(polaroidDiv);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
        });
        // This function is to stop the gifs
        // STATIC PARENT first then DYNAMIC CHILD for click event
        $("#gifs-appear-here ").on("click", "#gif", function() {
            var state = $(this).attr('data-state');
            console.log($(this).attr('data-state'));

            if (state == 'still') {
                $(this).attr("src", $(this).attr('data-animate'));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr('data-still'));
                $(this).attr("data-state", "still");
            }
        });
});