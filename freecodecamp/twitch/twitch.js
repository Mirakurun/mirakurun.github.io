function getChannels() {
    var channels = ["twitchpresents", "dansgaming", "admiralbahroo", "maximilian_dood", "annemunition", "freecodecamp"];

    channels.forEach(function(val){
        var url = "https://api.twitch.tv/kraken/streams/" + val + "?client_id=o0azfla1ko5uwng0vr8mk40nj4xapx";

        $.ajax({
            url: url,
            type: "GET",
        }).done(function(data){
            console.log(url);
            console.log(data);
        });

    });
    


}

$(document).ready(function(){
    getChannels();

});