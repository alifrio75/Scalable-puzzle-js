document.addEventListener("DOMContentLoaded", function () {
	var countXScore = 0;
	var countOScore = 0;
	var optionsButton = document.getElementById("gameStart");
	optionsButton.addEventListener("click", function () {
		optionsButton.innerHTML = "Reset";

		function isEven(value) {
			if (value % 2 == 0) {
				return true;
			} else {
				return false;
			}
		}

		function isOdd(value) {
			if (value % 1 == 0) {
				return true;
			} else {
				return false;
			}
		}

		function allSame(array) {
			var first = array[0];
			if (array[0] == "") {
				return false;
			} else {
				return array.every(function (element) {
					return element == first;
				});
			}
		}
		var customBackground = document.getElementById("gameTheme").value;
		var gameSize = parseInt(document.getElementById("gameSize").value);
		var gameBoard = [];
		var gameSquares = gameSize * gameSize;
		for (var i = 0; i < gameSquares; i++) {
			gameBoard.push(i);
		}
		document.getElementById("game").innerHTML = '<div id="board"></div>';
		var board = document.getElementById("board");
		board.style.margin = "auto";
		board.style.height = "100%";
		board.style.width = "100%";
		for (var i = 0; i < gameSquares; i++) {
			board.innerHTML += '<div class="square"></div>';
		}
		var squares = document.getElementsByClassName("square");
		for (var i = 0; i < gameSquares; i++) {
			squares[i].style.height = "calc(100% / " + gameSize + ")";
			squares[i].style.width = "calc(100% / " + gameSize + ")";
			squares[i].setAttribute("id", i.toString());
		}
		if (gameSquares % 2 !== 0) {
			for (var i = 0; i < gameSquares; i += 2) {
				squares[i].style.backgroundColor = customBackground;
			}
		} else {
			for (i = 0; i < gameSquares; i += 1) {
				if (isEven(i / gameSize)) {
					for (var squareNum = i; squareNum < i + gameSize; squareNum += 2) {
						squares[squareNum].style.backgroundColor = customBackground;
					}
				} else {
					if (isOdd(i / gameSize)) {
						for (var squareNum = i + 1; squareNum < i + gameSize; squareNum += 2) {
							squares[squareNum].style.backgroundColor = customBackground;
						}
					} else {}
				}
			}
		}
		var turnSwitch = document.getElementById("turnSwitch");
		turnSwitch.style.color = "black";
		turnSwitch.innerHTML = "X's Turn";
		var boardClicks = 0;
		board.addEventListener("click", function () {
			if (determineWinner()) {
				turnSwitch.style.color = "blue";
				turnSwitch.innerHTML = winnerPlayer[0] + " wins!";
				if (winnerPlayer[0] == "<p>X</p>") {
					countXScore += 1;
					document.getElementById("score_x").innerHTML = countXScore;
				} else {
					countOScore += 1;
					document.getElementById("score_o").innerHTML = countOScore;
				}
				setTimeout(function () {
					optionsButton.click();
				}, 500);
			} else {
				if (isEven(boardClicks)) {
					turnSwitch.style.color = "red";
					turnSwitch.innerHTML = "O's Turn";
				} else {
					turnSwitch.style.color = "black";
					turnSwitch.innerHTML = "X's Turn";
				}
			}
			boardClicks++;
		});
		var squareClicks = [];
		for (var i = 0; i < gameSquares; i++) {
			squareClicks[i] = 0;
		}
		var winnerPlayer;
		var determineWinner = function () {
			for (i = 0; i < gameSquares; i += 1) {
				if (i % gameSize == 0) {
					var rowCheck = [];
					for (var squareNum = i; squareNum < i + gameSize; squareNum += 1) {
						rowCheck.push(squares[squareNum].innerHTML);
					}
					if (allSame(rowCheck)) {
						winnerPlayer = rowCheck;
						return true;
					}
				}
			}
			for (i = 0; i < gameSquares; i += 1) {
				if (i < gameSize) {
					var colCheck = [];
					for (var squareNum = i; squareNum < gameSquares; squareNum += gameSize) {
						colCheck.push(squares[squareNum].innerHTML);
					}
					if (allSame(colCheck)) {
						winnerPlayer = colCheck;
						return true;
					}
				}
			}
			var diag1Check = [];
			for (i = 0; i < gameSquares; i += 1) {
				if (i % (gameSize + 1) == 0) {
					diag1Check.push(squares[i].innerHTML);
				}
			}
			if (allSame(diag1Check)) {
				winnerPlayer = diag1Check;
				return true;
			}
			var diag2Check = [];
			for (i = gameSize - 1; i < gameSquares - 1; i += 1) {
				if (i % (gameSize - 1) == 0) {
					diag2Check.push(squares[i].innerHTML);
				}
			}
			if (allSame(diag2Check)) {
				winnerPlayer = diag2Check;
				return true;
			}
		};
		var countClicks = function () {
			var divID = this.getAttribute("id");
			squareClicks[divID] += 1;
			if (isEven(boardClicks) && squareClicks[divID] == 1) {
				this.innerHTML = "<p>X</p>";
			} else {
				if (isOdd(boardClicks) && squareClicks[divID] == 1) {
					this.innerHTML = "<p>O</p>";
					this.style.color = "red";
				} else {
					if (!determineWinner()) {
						boardClicks -= 1;
					} else {}
				}
			}
			if (boardClicks == gameSquares - 1 && !determineWinner()) {
				optionsButton.click();
			}
			if (determineWinner()) {
				for (var i = 0; i < gameSquares; i++) {
					squareClicks[i] = 2;
				}
				document.getElementById("gameStart").innerHTML = "Play";
			}
		};
		for (var i = 0; i < gameSquares; i++) {
			squares[i].addEventListener("click", countClicks);
		}
	});
});