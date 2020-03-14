$(document).ready(function () {

    // my array
    var games = ["Final Fantasy", "The Last of Us", "Sonic the Hedgehog", "Minecraft", "Civilization", "Portal2", "Day of the Tentacle"];

    //displays the original gif buttons

    function displayButtons() {
        $("#buttonList").empty();
        for (var i = 0; i < games.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("vidGame");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", games[i]);
            gifButton.text(games[i]);
            $("#buttonList").append(gifButton);
        }
    }

    //add new button

    function addNewButton() {
        $("#addGif").on("click", function () {
            var vidGame = $("#topicInput").val().trim();
            if (vidGame == "") {
                return false;//no blank buttons
            }
            games.push(vidGame);

            displayButtons();
            return false;
        });
    }

    //remove last button
    function removeLastButton() {
        $("removeGif").on("click", function () {
            games.pop(vidGame);
            displayButtons();
            return false;
        });

    }

    //displays the gifs

    function displayGifs() {
        var vidGame = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + vidGame + "&api_key=rBLNPaM4mfQiCXkU9zG7grCbWiwGM50N&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .done(function (response) {
                $("#gifGrid").empty();
                //show results of gifs
                var results = response.data;
                if (results == "") {
                    alert("There is not a gif for this!");
                }
                for (var i = 0; i < results.length; i++) {
                    //put gifs in a div
                    var gifDiv = $("<div1>");
                    //pull rating of gif
                    var gifRating = $("<p>").text("Rating " + results[i].rating);
                    gifDiv.append(gifRating);

                    //pull gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    //pause images
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    //animate images
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    //images come in already paused
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