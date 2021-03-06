$(document).ready(function () {
    $("#m").text($("#min-input").val());

    var runTimer = false,
        countdown,
        id = 0,
        s = Number($("#s").text()),
        m = Number($("#m").text());

    $("#min-input").on("input", function () {
        $("#m").text($("#min-input").val());
        m = Number($("#m").text());
        $("#s").text("00");
        s = Number($("#s").text());
    }).keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
        }
    });
    $("#circle").click(function () {
        if (!runTimer) {
            runTimer = true;
            $("#min-input").prop("disabled", true);
            $("#minus").prop("disabled", true);
            $("#plus").prop("disabled", true);
            countdown = setInterval(function () {
                console.log(runTimer);
                console.log(s);
                console.log(m);
                if (s > 0) {
                    s--;
                } else if (s === 0 && m > 0) {
                    s = 59;
                    m--;
                } else {
                    runTimer = false;
                    clearInterval(countdown);
                }
                $("#s").text(("0" + s).slice(-2));
                $("#m").text(("0" + m).slice(-2));
            }, 1000);
        } else if (runTimer) {
            runTimer = false;
            $("#min-input").prop("disabled", false);
            $("#minus").prop("disabled", false);
            $("#plus").prop("disabled", false);
            clearInterval(countdown);
            console.log(runTimer);
        }
    });
    $("#minus").on("mousedown", function () {
        id = setInterval(function () {
            if (m > 0) {
                m--;
                $("#m").text(("0" + m).slice(-2));
                $("#min-input").val(m);
            }
        }, 200);
    }).on("mouseup mouseleave", function () {
        clearInterval(id);
    }).click(function () {
        if (m > 0) {
            m--;
            $("#m").text(("0" + m).slice(-2));
            $("#min-input").val(m);
        }
    });
    $("#plus").on("mousedown", function () {
        id = setInterval(function () {
            if (m < 99) {
                m++;
                $("#m").text(("0" + m).slice(-2));
                $("#min-input").val(m);
            }
        }, 200);
    }).on("mouseup mouseleave", function () {
        clearInterval(id);
    }).click(function () {
        if (m < 99) {
            m++;
            $("#m").text(("0" + m).slice(-2));
            $("#min-input").val(m);
        }
    });
});