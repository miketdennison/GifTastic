var topics = ["bike fail", "skateboard fail", "rollerblade fail", "twerk fail"];
var queryURL = "https://api.giphy.com/v1/gifs/search";
var numOfTopics = 0;

populateButtons();

function populateButtons() {
    var button;
    for (var i = numOfTopics; i < topics.length; i++) {
        numOfTopics++;
        button = $("<button>").addClass("gif-button");
        button.text(topics[i]);
        $("#buttons-appear-here").append(button);
    }
}

$(".gif-button").on("click", function () {
    var topic = $(this).text();
    console.log("GIFBUTTON!");
    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            q: topic,
            limit: 10,
            api_key: "TvxUorJMi4adfnEVgKWwfMiySgpMqg9U",
        }
    }).then(function (response) {
        var data = response.data;
        var gifDiv;
        var failGif;
        $("#gifs-appear-here").empty();
        for (var i = 0; i < data.length; i++) {
            gifDiv = $("<div>").addClass("float-left mr-12");
            failGif = $("<img>").attr("src", data[i].images.fixed_height.url).attr("data-state", "animated");
            failGif.attr("data-still", data[i].images.fixed_height_still.url);
            failGif.attr("data-animated", data[i].images.fixed_height.url);
            failGif.addClass("gif");
            gifDiv.prepend("<p>" + data[i].rating + "</p>");
            gifDiv.append(failGif);
            $("#gifs-appear-here").append(gifDiv);
        }
    });
});

// The ".gif" parameter is a selector parameter that is the descendent of the element (gifs-appear-here) that triggered the event
$("#gifs-appear-here").on("click", ".gif", function () {
    var gif = $(this);
    var state = gif.attr("data-state");
    if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
});

$("#submit").on("click", function(e) {
    e.preventDefault(); // prevent form from being generated (clears out page content)
    var fail = $("#fail-input").val().trim();
    topics.push(fail.toLowerCase());
    populateButtons();
});
