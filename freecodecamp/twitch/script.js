function getData() {
    var channels = ["twitchpresents", "dansgaming", "admiralbahroo", "maximilian_dood", "annemunition", "followgrubby", "pokimane", "tvique", "teamsp00ky", "bobross", "chu8", "summit1g", "freecodecamp"];

    channels.forEach(function (val) {
        var url = "https://api.twitch.tv/kraken/channels/" + val + "?client_id=o0azfla1ko5uwng0vr8mk40nj4xapx",
            url2 = "https://api.twitch.tv/kraken/streams/" + val + "?client_id=o0azfla1ko5uwng0vr8mk40nj4xapx";

        $.when(
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json"
            }),
            $.ajax({
                url: url2,
                type: "GET",
                dataType: "json"
            })
        ).then(function (data1, data2) {
            var data3;

            if (data2[0].stream === null) {
                data3 = {
                    link: data1[0].url,
                    logo: data1[0].logo,
                    name: data1[0].display_name,
                    activity: "offline",
                    game: "",
                    preview: "SMPTE_Color_Bars_16x9_640x360.png",
                    status: "Offline"
                }
            } else {
                data3 = {
                    link: data1[0].url,
                    logo: data1[0].logo,
                    name: data1[0].display_name,
                    activity: "online",
                    game: data2[0].stream.channel.game,
                    preview: data2[0].stream.preview.large,
                    status: data2[0].stream.channel.status
                }
            }
            appendlist(data3);
        });
    })
}

function appendlist(d) {
    $("#list")
        .append(
        $("<div/>", { "class": "col-lg-4 col-lg-offset-0 col-md-4 col-md-offset-0 col-sm-6 col-sm-offset-0 col-xs-10 col-xs-offset-1"})
            .addClass(d.activity)
            .append(
            $("<div/>")
                .append(
                $("<img>", { src: d.preview, "class": "img-responsive" })
                ),
            $("<div/>")
                .append(
                $("<img>", { src: d.logo, "class": "logo" }), $("<a/>", { href: d.link, target: "_blank" }).text(d.name), $("<p/>").text(d.game + d.status)
                )
            )
        )
}

$(document).ready(function () {
    getData();

    $("#selector").change(function () {
        if ($("#selector").val() == "All") {
            $(".online, .offline").removeClass("hidden").addClass("show");
        } else if ($("#selector").val() == "Online") {
            $(".online").addClass("show").removeClass("hidden");
            $(".offline").addClass("hidden").removeClass("show");
        } else if ($("#selector").val() == "Offline") {
            $(".online").addClass("hidden").removeClass("show");
            $(".offline").addClass("show").removeClass("hidden");
        }
    })
});