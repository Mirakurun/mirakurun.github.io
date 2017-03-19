function getChannels() {
    var arrChannels = ["TwitchPresents"];
    var strChannels = arrChannels.join();
    var url = "https://api.twitch.tv/kraken/streams?channel=twitchpresents,dansgaming&callback=?&client_id=o0azfla1ko5uwng0vr8mk40nj4xapx";

    $.ajax({
        url: url,
        type: "GET",
    }).done(function(data){
        console.log(url);
        console.log(data);
    });

}

$(document).ready(function(){
    console.log("hello world");
    getChannels();

});