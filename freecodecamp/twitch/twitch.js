function getChannels() {
    var channels = ["dansgaming"];
    var url = "https://api.twitch.tv/kraken/streams?callback=?&client_id=o0azfla1ko5uwng0vr8mk40nj4xapx&channel=" + channels;

    $.ajax({
        url: url,
        type: "GET",
    }).done(function(data){
        console.log(data);
    });

}

$(document).ready(function(){
    getChannels();

});