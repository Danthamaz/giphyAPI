$(document).ready(function () {

    // var API_key = "xoyEoew0BB2fCv8wecrgRj1tv9xS7FoV";
    var topics = ["Cats"];
    // This function loads gifs from pressing a button to the left
    function renderButtons() {

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("btn btn-lg btn-block btn-dark");
            a.attr("id", "button-topic");
            a.attr("type", "button");
            a.attr("data-topic", topics[i]);
            a.text(topics[i]);
            $("#buttons").append(a);
        };
    };

    $("#buttons").on("click", "#button-topic", function () {
        // sets the search term equal to the topic of this button. 
        var searchTerm = $(this).attr("data-topic");
        // This is the API URL we will use to get 10 gifs
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=xoyEoew0BB2fCv8wecrgRj1tv9xS7FoV&limit=10";

        // AJAX call to get data
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // after AJAX gets data, do this...
            .then(function (response) {
                // Set a variable to a specific area for easier access
                var results = response.data;

                // a for loop for each gif
                for (var i = 0; i < results.length; i++) {
                    // adds a new div with class item for each gif
                    var gifDiv = $("<div class='item'>");

                    // takes the rating for the gif into variable
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);


                    // adds an img tag for the gif and sets up all classes/ids/data information for still/animation
                    var topicImage = $("<img>");
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", results[i].images.fixed_height.url);
                    topicImage.attr("id", "gif");
                    topicImage.attr("data-state", "still");

                    // prepends all the information in order    
                    gifDiv.prepend(p);
                    gifDiv.prepend(topicImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
        // This function is to stop the gifs
        // STATIC PARENT first then DYNAMIC CHILD for click event
    });


    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        var newTopic = $("#topic-input").val().trim();
        topics.push(newTopic);
        renderButtons();
        $("#topic-input").trigger("reset");
    });

    $("#gifs-appear-here ").on("click", "#gif", function () {
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