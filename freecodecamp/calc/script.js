$(document).ready(function () {
    var answer = "",
        history = "0",
        log = ["0"],
        digit = new RegExp(/\d/),
        arithmetic_operator = new RegExp(/[-+/*]$/),
        decimal = new RegExp(/\.+/),
        decimal_at_end = new RegExp(/\.$/),
        decimal_followed_by_zeroes = new RegExp(/\d+\.0{1,}$/),
        reset = "off";

    $("#ac").click(function () {
        $("#answer").text("0");
        $("#history").text("");
        history = "0";
        log = ["0"];
        reset = "off";
        answer = "";
    });
    $("#ce").click(function () {
        $("#answer").text("0");
        if (digit.test(log[log.length - 1])) {
            if (log.length === 1) {
                log = ["0"];
                history = "0";
                answer = "";
            } else {
                log.pop();
                history = log.join("");
            }
        } else if ($("#answer").text() === "undefined") {
            $("#history").text("");
            history = "0";
            reset = "off";
            answer = "";
        }
    });
    $(".operator").click(function () {
        if (decimal_followed_by_zeroes.test(log[log.length - 1])) {
            log[log.length - 1] = log[log.length - 1].slice(0, log[log.length - 1].indexOf("."));
            history = log.join("");
            answer = log.join(log[log.length - 1]);
            $("#answer").text(answer);
        }
        if ($(this).val() !== "=") {
            if (reset = "yes") {
                reset = "no";
            }
            if (digit.test(log[log.length - 1]) && decimal_at_end.test(log[log.length - 1]) === false) {
                if (log.length >= 3) {
                    answer = eval(log.join("")).toPrecision(10) / 1;
                    answer = answer.toString();
                    $("#answer").text(answer);
                    log = [answer];
                    log.push($(this).val());
                    history = history.concat($(this).attr("id"));
                    $("#history").text(history);
                    console.log(log);
                    console.log(history);
                    console.log($(this).text());
                } else {
                    log.push($(this).val());
                    history = history.concat($(this).attr("id"));
                    $("#history").text(history);
                    console.log(log);
                    console.log(history);
                    console.log($(this).text());
                }
            } else if (arithmetic_operator.test(log[log.length - 1])) {
                if (log[log.length - 1] !== $(this).val()) {
                    history = history.replace(history.charAt(history.length - 1), $(this).attr("id"));
                    log.splice(-1, 1, $(this).val());
                    $("#history").text(history);
                    console.log(log);
                    console.log(history);
                    console.log($(this).text());
                }
            } else if (decimal_at_end.test(log[log.length - 1])) {
                history = history.replace(history.charAt(history.length - 1), $(this).attr("id"));
                $("#history").text(history);
                answer = answer.replace(answer.charAt(answer.length - 1), "");
                $("#answer").text(answer);
                log = [log[log.length - 1].replace(log[log.length - 1].charAt(log[log.length - 1].length - 1), "")];
                log.push($(this).val());
                console.log(log);
                console.log(history);
                console.log($(this).text());
            }
        } else if ($(this).val() === "=") {
            if (arithmetic_operator.test(log[log.length - 1])) {
                log.push($("#answer").text());
                answer = eval(log.join("")).toPrecision(10) / 1;
                answer = answer.toString();
                history = answer
                if (answer === "Infinity" || answer === "NaN") {
                    answer = "undefined";
                    log = [0];
                }
                $("#answer").text(answer);
                $("#history").text("");
                reset = "on";
                console.log(log);
                console.log(history);
                console.log($(this).text());
            } else if (digit.test(log[log.length - 1]) && log.length !== 1) {
                answer = eval(log.join("")).toPrecision(10) / 1;
                answer = answer.toString();
                log = [answer];
                history = answer;
                if (answer === "Infinity" || answer === "NaN") {
                    answer = "undefined";
                    log = [0];
                }
                $("#answer").text(answer);
                $("#history").text("");
                reset = "on";
                console.log(log);
                console.log(history);
                console.log($(this).text());
            }
            if ($("#answer").text().length > 10) {
                if (decimal.test(answer)) {
                    answer = answer.slice(0, 11);
                    $("#answer").text(answer);
                } else {
                    answer = answer.slice(0, 10);
                    $("#answer").text(answer);
                }
            }
        }
    });
    $(".number").click(function () {
        if (log[log.length - 1].length < 10) {
            if (log[log.length - 1] === "0") {
                if (reset === "on") {
                    reset = "off";
                }
                if ($(this).text() !== "0" && $(this).text() !== ".") {
                    log.splice(-1, 1, $(this).text());
                    answer = $(this).text();
                    $("#answer").text(answer);
                    history = history.replace(history.charAt(history.length - 1), $(this).text());
                    console.log(log);
                    console.log(history);
                    console.log($(this).text());
                } else if ($(this).text() === ".") {
                    if ($("#answer").text().includes(".") === false) {
                        log[log.length - 1] = log[log.length - 1].concat(".");
                        answer = "0.";
                        $("#answer").text(answer);
                        history = history.concat(".");
                        console.log(log);
                        console.log(history);
                        console.log($(this).text());
                    }
                }
            } else if (arithmetic_operator.test(log[log.length - 1])) {
                if (reset === "on") {
                    reset = "off";
                }
                if ($(this).text() !== $("#answer").text() && $(this).text() !== ".") {
                    log.push($(this).text());
                    history = history.concat($(this).text());
                    $("#answer").text($(this).text());
                    console.log(log);
                    console.log(history);
                    console.log($(this).text());
                } else if ($(this).text() === ".") {
                    log.push("0.");
                    history = history.concat("0.");
                    answer = "0.";
                    $("#answer").text(answer);
                    console.log(log);
                    console.log(history);
                    console.log($(this).text());
                } else if ($(this).text() === $("#answer").text()) {
                    log.push($(this).text());
                    history = history.concat($(this).text());
                    console.log(log);
                    console.log(history);
                    console.log($(this).text());
                }
            } else if (digit.test(log[log.length - 1])) {
                if ($("#answer").text().includes(".") === false && $(this).text() === ".") {
                    if (reset === "on") {
                        history = "0";
                        log = ["0"];
                        reset = "off";
                    }
                    log[log.length - 1] = log[log.length - 1].concat($(this).text());
                    answer = log[log.length - 1];
                    $("#answer").text(answer);
                    history = history.concat($(this).text());
                    console.log(log);
                    console.log(history);
                    console.log($(this).text());
                } else if ($(this).text() !== ".") {
                    if (reset === "on") {
                        history = "";
                        log = [""];
                        reset = "off";
                    }
                    log[log.length - 1] = log[log.length - 1].concat($(this).text());
                    answer = log[log.length - 1];
                    $("#answer").text(answer);
                    history = history.concat($(this).text());
                    console.log(log);
                    console.log(history);
                    console.log($(this).text());
                }
            }
        }
    });
});