var user,
    computer,
    currentPlayer,
    moves = [],
    userMoves = [],
    computerMoves = [],
    gameover = false,
    winner = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["7", "4", "1"],
        ["8", "5", "2"],
        ["9", "6", "3"],
        ["7", "5", "3"],
        ["9", "5", "1"]
    ],
    x = "<i class='fa fa-5x fa-times' aria-hidden='true'></i>",
    o = "<i class='fa fa-5x fa-circle-o' aria-hidden='true'></i>";

function firstMove() {
    var first = Math.floor((Math.random() * 2));

    $("#restart-msg").text("");

    if (first === 0) {
        userMove();
    } else {
        computerMove();
    }
}

function userMove() {
    currentPlayer = user;

    $("#msg").text("Your move");
}

function computerMove() {
    var computerMove;

    currentPlayer = computer;

    $("#msg").text("Computer's move");

    do {
        computerMove = (Math.floor((Math.random() * 9) + 1)).toString();
        console.log("computer's move: " + computerMove);
    } while (moves.indexOf(computerMove) !== -1 && !gameover);

    if (moves.indexOf(computerMove) === -1 && !gameover) {
        setTimeout(function () {
            $("#" + computerMove).html(computer);
            moves.push(computerMove);
            computerMoves.push(computerMove);
            checkWinner();
            if (!gameover) {
                userMove();
            }
            console.log(moves);
            console.log("computer picks: " + computerMoves);
        }, 2000);
    }
}

function checkWinner() {
    winner.forEach(function (arr) {
        if (arr.every(function (val) {
            return userMoves.indexOf(val) !== -1;
        })) {
            $("#restart-msg").text("You win!");
            $("#restart-modal").modal("show");
            gameover = true;
        } else if (arr.every(function (val) {
            return computerMoves.indexOf(val) !== -1;
        })) {
            $("#restart-msg").text("Computer wins!");
            $("#restart-modal").modal("show");
            gameover = true;
        }
    });
    if (moves.length === 9) {
        $("#restart-msg").text("Draw!");
        $("#restart-modal").modal("show");
        gameover = true;
    } 
}

function restart() {
    user = "",
        computer = "",
        currentPlayer = "",
        moves = [],
        userMoves = [],
        computerMoves = [],
        gameover = false;

    $(".box").html("");
    $("#msg").text("");

    console.log("reset");
    console.log(user);
    console.log(computer);
    console.log(moves);
    console.log(userMoves);
    console.log(computerMoves);
    console.log(currentPlayer);
    console.log("reset");

    $("#select-modal").modal("show");
}

$(document).ready(function () {
    $("#select-modal").modal("show");

    $("button").click(function () {
        if ($(this).attr("id") === "x") {
            user = x;
            computer = o;
        } else if ($(this).attr("id") === "o") {
            user = o;
            computer = x;
        }
        firstMove();
    });

    $(".box").click(function () {
        if (currentPlayer === user && $(this).html() === "") {
            $(this).html(user);
            moves.push($(this).attr("id"));
            userMoves.push($(this).attr("id"));
            checkWinner();
            if (!gameover) {
                computerMove();
            }
            console.log(moves);
            console.log("user picks:" + userMoves);
        }
    });

    $("#restart").click(function () {
        restart();
    });
});