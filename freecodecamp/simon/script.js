var sequence = [],
    repeat = [],
    currentTurn,
    strict = false,
    counter = Number($("#counter").text()),
    sound1 = new Audio("simonSound1.mp3"),
    sound2 = new Audio("simonSound2.mp3"),
    sound3 = new Audio("simonSound3.mp3"),
    sound4 = new Audio("simonSound4.mp3"),
    error = new Audio("error.mp3");

function startGame() {
    currentTurn = "computer";
    newSequence();
}

function newSequence() {
    var random;

    random = Math.floor((Math.random() * 4) + 1);
    sequence.push(random);

    if (sequence.length > 20) {
        victory();
    } else {
        counter++;
        $("#counter").text(("0" + counter).slice(-2));

        console.log("new sequence");
        console.log(random);
        playSequence();
    }
}

function checkRepeat() {
    for (var i = 0; i < repeat.length; i++) {
        if (repeat[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

function nextTurn() {
    if (currentTurn === "computer") {
        currentTurn = "user";
        console.log(currentTurn);
    } else if (currentTurn === "user") {
        currentTurn = "computer";
        console.log(currentTurn);
    }
}

function playSequence() {
    console.log("play sequence");
    var i;

    i = 0;

    var id = setInterval(function () {
        if (sequence[i] === 1) {
            console.log("green");
            $(".green-btn").css("filter", "brightness(130%)");
            sound1.play();
            setTimeout(function () {
                $(".green-btn").css("filter", "brightness(100%)");
                i++;
                if (i === sequence.length) {
                    clearInterval(id);
                    nextTurn();
                }
            }, 1000);
        } else if (sequence[i] === 2) {
            console.log("red");
            $(".red-btn").css("filter", "brightness(130%)");
            sound2.play();
            setTimeout(function () {
                $(".red-btn").css("filter", "brightness(100%)");
                i++;
                if (i === sequence.length) {
                    clearInterval(id);
                    nextTurn();
                }
            }, 1000);
        } else if (sequence[i] === 3) {
            console.log("yellow");
            $(".yellow-btn").css("filter", "brightness(130%)");
            sound3.play();
            setTimeout(function () {
                $(".yellow-btn").css("filter", "brightness(100%)");
                i++;
                if (i === sequence.length) {
                    clearInterval(id);
                    nextTurn();
                }
            }, 1000);
        } else if (sequence[i] === 4) {
            console.log("blue");
            $(".blue-btn").css("filter", "brightness(130%)");
            sound4.play();
            setTimeout(function () {
                $(".blue-btn").css("filter", "brightness(100%)");
                i++;
                if (i === sequence.length) {
                    clearInterval(id);
                    nextTurn();
                }
            }, 1000);
        }
    }, 1500);
}

function playError(){
    setTimeout(function(){
        error.play();
    }, 600);
}

function victory() {
    $("#victory-modal").modal("show");
}

$(document).ready(function () {
    var id;
    startGame();

    $("button").click(function () {
        console.log("clicked " + $(this).attr("id"));
        if (currentTurn === "user" && repeat.length < sequence.length && $(this).attr("id") !== "reset-btn" && $(this).attr("id") !== "strict-btn") {
            repeat.push(Number($(this).attr("id")));
            if (repeat.length === sequence.length) {
                if (checkRepeat()) {
                    console.log("success");
                    repeat = [];
                    nextTurn();
                    newSequence();
                } else {
                    if (strict) {
                        console.log("fail");
                        repeat = [];
                        sequence = [];
                        counter = 0;
                        $("#counter").text(("0" + counter).slice(-2));
                        playError();
                        nextTurn();
                        newSequence();
                    } else {
                        console.log("fail");
                        repeat = [];
                        playError();
                        nextTurn();
                        playSequence();
                    }
                }
            } else if (repeat.length < sequence.length) {
                if (!checkRepeat()) {
                    if (strict) {
                        console.log("fail");
                        repeat = [];
                        sequence = [];
                        counter = 0;
                        $("#counter").text(("0" + counter).slice(-2));
                        playError();
                        nextTurn();
                        newSequence();
                    } else {
                        console.log("fail");
                        repeat = [];
                        playError();
                        nextTurn();
                        playSequence();
                    }
                }
            }
        }
    }).on("mousedown", function () {
        if (currentTurn === "user" && repeat.length < sequence.length) {
            if ($(this).attr("id") === "1") {
                $(".green-btn").css("filter", "brightness(130%)");
                sound1.play();
            } else if ($(this).attr("id") === "2") {
                $(".red-btn").css("filter", "brightness(130%)");
                sound2.play();
            } else if ($(this).attr("id") === "3") {
                $(".yellow-btn").css("filter", "brightness(130%)");
                sound3.play();
            } else if ($(this).attr("id") === "4") {
                $(".blue-btn").css("filter", "brightness(130%)");
                sound4.play();
            }
            $(this).mouseleave(function () {
                $(this).unbind('mouseleave');
                if ($(this).attr("id") === "1") {
                    $(".green-btn").css("filter", "brightness(100%)");
                } else if ($(this).attr("id") === "2") {
                    $(".red-btn").css("filter", "brightness(100%)");
                } else if ($(this).attr("id") === "3") {
                    $(".yellow-btn").css("filter", "brightness(100%)");
                } else if ($(this).attr("id") === "4") {
                    $(".blue-btn").css("filter", "brightness(100%)");
                }
            });
        }
    }).on("mouseup", function () {
        if (currentTurn === "user" && repeat.length < sequence.length) {
            if ($(this).attr("id") === "1") {
                $(".green-btn").css("filter", "brightness(100%)");
            } else if ($(this).attr("id") === "2") {
                $(".red-btn").css("filter", "brightness(100%)");
            } else if ($(this).attr("id") === "3") {
                $(".yellow-btn").css("filter", "brightness(100%)");
            } else if ($(this).attr("id") === "4") {
                $(".blue-btn").css("filter", "brightness(100%)");
            }

            /*
            repeat.push(Number($(this).attr("id")));
            console.log("repeat array: " + repeat);
            if (repeat.length === sequence.length) {
                if (checkRepeat()) {
                    console.log("success");
                    repeat = [];
                    nextTurn();
                    newSequence();
                } else {
                    console.log("fail");
                    repeat = [];
                    nextTurn();
                    playSequence();
                }
            }
            */
        }
    });

    $("#reset-btn").click(function () {
        document.location.reload();
    });

    $("#strict-btn").click(function () {
        if (!strict) {
            strict = true;
            $("#led").css("background-color", "red");
            console.log(strict);
        } else if (strict) {
            strict = false;
            $("#led").css("background-color", "black");
            console.log(strict);
        }
    });
});