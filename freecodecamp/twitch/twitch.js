function getChannels() {
    var channels = ["TwitchPresents", "maximilian_dood", "admiralbahroo", "dansgaming"];
    var url = "https://api.twitch.tv/kraken/streams?channel=" + channels.join() + "&client_id=o0azfla1ko5uwng0vr8mk40nj4xapx";

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function(data){
        console.log(url);
        console.log(data);
    });

}

$(document).ready(function(){
    getChannels();

    $("button").click(function(){
        $("button").text("f");


    });

});