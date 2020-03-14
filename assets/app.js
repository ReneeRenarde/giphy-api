$(document).ready(function () {

    // my array
    var topic = ["Final Fantasy", "The Last of Us", "Sonic the Hedgehog", "Minecraft", "Civilization", "Portal2", "Day of the Tentacle"];

    //function that displays the gif buttons

    function displayButtons() {
        $("#buttonList").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("vidGame");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#buttonList").append(gifButton);
        }
    }

    //function to add new button

    function addNewButton() {
        $("#addGif").on("click", function () {
            var vidGame = $("#topicInput").val().trim();
            if (vidGame == "") {
                return false;//no blank buttons
            }
            topic.push(vidGame);

            displayGifButtons();
            return false;
        });
    }

    //function to remove last button
    function removeLastButton() {
        $("removeGif").on("click", function () {
            topic.pop(vidGame);
            displayGifButtons();
            return false;
        });

    }

    // function that displays the gifs

    function displayGifs() {
        var vidGame = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + lady + "&api_key=rBLNPaM4mfQiCXkU9zG7grCbWiwGM50N=8";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .done(function (response) {
                $("#gifGrid").empty();
                //show results of gifs
                var results = response.data;
                if (results == "") {
                    alert("There is not a giffy for this!");
                }
                for (var i = 0; i < results.length; i++) {
                    //put gifs in a div
                    var gifDiv = $("<div1>");
                    //pull rating of gif
                    var gifRating = $("<p>").text("Rating " + results[i].rating);
                    gifDiv.append(gifRating);

                    //pull gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    //paused images
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    //animated images
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    //how images come in, already paused
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    //add new div to existing divs
                    $("#gifGrid").prepend(gifDiv);
                }
            });
    }

    displayButtons();
    addNewButton();
    removeLastButton();



    //event listeners
    $(document).on("click", ".vidGame", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });

});