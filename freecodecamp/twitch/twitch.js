function getChannels() {
    var channels = ["TwitchPresents", "dansgaming", "admiralbahroo", "maximilian_dood", "annemunition"];

    channels.forEach(function(val){
        var url = "https://api.twitch.tv/kraken/streams/" + val + "&client_id=o0azfla1ko5uwng0vr8mk40nj4xapx";

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json"
        }).done(function(data){
            console.log(url);
            console.log(data);
        });

    });
    


}

$(document).ready(function(){
    getChannels();

});