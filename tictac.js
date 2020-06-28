let isGameActive = false;
let gameStatus = "start"; //stop start
let currentPlayer = "first";
let whoWin = "";
let gameCharater = [
  "🤩",
  "😄",
  "😆",
  "🤣",
  "😉",
  "😅",
  "😘",
  "🥰",
  "😎",
  "😍",
  "😏",
  "🙄",
  "⚽",
  "🏀",
  "👨",
  "👩",
  "😲",
  "🤑",
];

//Player character set
let playerOne = gameCharater[0];
let playerTwo = gameCharater[1];
let gameCharaterCount = 1;

// Click event handle on click of block
function onClick(id) {
  let value = document.getElementById(id).innerHTML;
  if ([playerOne, playerTwo].includes(value) || gameStatus === "stop") {
    // We are checking click event on already cliked cell or game is finished
    return;
  }
  document.getElementById(id).style.fontSize = "xx-large";
  if (currentPlayer === "first") {
    document.getElementById(id).innerHTML = playerOne;
    document.getElementById(id).style.color = "white";
    document.getElementById(id).style.background = "green";
    currentPlayer = "second";
  } else if (currentPlayer === "second") {
    document.getElementById(id).innerHTML = playerTwo;
    document.getElementById(id).style.color = "white";
    document.getElementById(id).style.background = "red";
    currentPlayer = "first";
  }

  // Checks for draw and win
  if (checkWin()) {
    let msg = "";
    if (whoWin === playerOne) {
      msg = "First Player won";
    } else {
      msg = "Second Player won";
    }
    gameStatus = "stop";
    document.getElementById("gstatus").innerHTML = msg;
  } else if (checkDraw()) {
    document.getElementById("gstatus").innerHTML = "Game Draw";
  } else {
    document.getElementById("gstatus").innerHTML = "Going On";
    document.getElementById("turn").innerHTML = `${currentPlayer} Player Turn`;
  }
}

function sound(src) {
  let music = document.createElement("audio");
  music.src = src;
  music.setAttribute("preload", "auto");
  music.setAttribute("controls", "none");
  music.style.display = "none";
  document.body.appendChild(music);
  this.play = function () {
    music.play();
    music.loop = true;
  };
  this.stop = function () {
    music.pause();
  };
}

// Check the draw position
function checkDraw() {
  if (allBlockFill()) {
    return true;
  } else {
    return false;
  }
}

// Check win condition
function checkWin() {
  if ((res1 = isSame(1, 2, 3))) {
    return true;
  } else if ((res2 = isSame(4, 5, 6))) {
    return true;
  } else if ((res3 = isSame(7, 8, 9))) {
    return true;
  } else if ((res4 = isSame(1, 5, 9))) {
    return true;
  } else if ((res5 = isSame(3, 5, 7))) {
    return true;
  } else if ((res6 = isSame(1, 4, 7))) {
    return true;
  } else if ((res7 = isSame(2, 5, 8))) {
    return true;
  } else if ((res8 = isSame(3, 6, 9))) {
    return true;
  }
  return false;
}

function allBlockFill() {
  // checks for all blocked are filled
  let isFilled = false;
  for (let i = 1; i <= 9; i++) {
    let value = document.getElementById(`${i}`).innerHTML;
    isFilled = [playerOne, playerTwo].includes(value) ? true : false;
    if (!isFilled) return false;
  }
  return isFilled;
}

function isSame(x, y, z) {
  // checks for winning position
  let value1 = document.getElementById(x).innerHTML;
  let value2 = document.getElementById(y).innerHTML;
  let value3 = document.getElementById(z).innerHTML;
  whoWin = value1;
  return [value1, value2, value3].every((val) => {
    return val === whoWin;
  });
}

function resetGame() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById(`${i}`).innerHTML = i;
    document.getElementById(`${i}`).style.background = "lightgray";
    document.getElementById(`${i}`).style.color = "black";
  }
  currentPlayer = "first";
  gameStatus = "start";
  document.getElementById("gstatus").innerHTML = "Start";
  if (gameCharaterCount === gameCharater.length - 1) {
    gameCharaterCount = -1;
  }
  playerOne = gameCharater[++gameCharaterCount];
  playerTwo = gameCharater[++gameCharaterCount];
  document.getElementById("p1").innerHTML = playerOne;
  document.getElementById("p2").innerHTML = playerTwo;
}
