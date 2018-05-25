var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}

};



var model = {
  boardSize: 7,

  numShips: 3,

  shipLength: 3,

  shipsSunk: 0,

  ships: [{locations:["0","0","0"],hits:["","",""]},
          {locations:["0","0","0"],hits:["","",""]},
          {locations:["0","0","0"],hits:["","",""]}],


	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (ship.hits[index] === "hit") {
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("You hit");//告诉视图，玩家的猜测击中了

				if (this.isSunk(ship)) {
					view.displayMessage("GOOD!!!!!!!!!!!");//击沉了
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("MISS");//没打着
		return false;
	},


  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++){
      if (ship.hits[i] !== 'hit'){
        return false;//没被击3，浮着
      }
    }
    return true;//被击沉，返回true
  },

  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));  //生成战舰占据的一系列位置，并检查循环，是否重复；
      this.ships[i].locations = locations;
    }
  },


  generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength)); 
		} else {
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));//让代码更通用
			row = Math.floor(Math.random() * this.boardSize);
		}

    var newShipLocations = [];//新战舰，空格
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));//水平，i表示存储字符串
      } else {
        newShipLocations.push((row + i) + "" + col);//竖排
      }
    }
    return newShipLocations;
  },


	collision: function(locations) {//存储战舰位置
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) { //检查该位置是否有战舰占据
					return true;
				}
			}
		}
		return false; //没碰撞
	},
};

var controller = {
  guesses: 0,
  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {//击中
				view.displayMessage("You sank all of my battleships, in " + this.guesses + 
				"guesses, well done!")//向玩家显示击中
      }
    }
  }
};










function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
	if (guess === null || guess.length !== 2) {
		alert("Oops, ins't on the board.");
	} else {
		firstChar = guess.charAt(0);//获得字符串第1个
		var row = alphabet.indexOf(firstChar);//获取字母在数组中的位置
		var column = guess.charAt(1);//获得字符串第二个
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");//检查是否都是数字
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
};







function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();
	controller.processGuess(guess); //交给控制器
	guessInput.value = "";
};
function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) {
		fireButton.click();
		return false;//不让表单做任何事情
	}
};

window.onload = init;

function init () {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
};
