function getChannels() {
    var arrChannels = ["dansgaming", "twitchpresents"];
    var strChannels = arrChannels.join();
    var url = "https://api.twitch.tv/kraken/streams?callback=?&client_id=o0azfla1ko5uwng0vr8mk40nj4xapx&channel=" + channels;

    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/dansgaming?client_id=o0azfla1ko5uwng0vr8mk40nj4xapx",
        type: "GET",
    }).done(function(data){
        console.log(strChannels);
        console.log(data);
    });

}

$(document).ready(function(){
    console.log("hello world");
    getChannels();

});