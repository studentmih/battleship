var view = {
  displayMessage:function(msg){
    var messageArea =document.getElementById("messageArea")
    messageArea.innerHTML = msg;
  },
  displayHit:function(location){
    var cell = document.getElementById(location)
    cell.setAttribute("class","Hit");
  },
  displayMiss:function(location){
    var cell = document.getElementById(location)
    cell.setAttribute("class","miss");
  }
};
var model = {
  boardSize: 7,
  sumShips: 3,
  shipsSunk: 0,
  shipLength: 3,
  ships:[{ location: ["0", "0", "0"],hits:["","",""]        },
              { location: ["0", "0", "0"],hits:["","",""]   },
              { location: ["0", "0", "0"],hits:["","","hit"]}],
  fire: function (guess){
    for(var i = 0;i < this.numShips; i++){
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if(index >= 0){
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT");
        if(this.isSunk(ship)){
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },
  isSunk:function(ship){
    for(var i = 0; i < this.shipLength; i++){
      if(ship.hits[i]!=="hit"){
        return false;
      }
    }
    return true;
  }
},

function parseGuess(guess){
    var alphabet = ["A", "B", "C", "D", "E", "G"];

  if (guess === null || guess.length !==2){
    alert("oops,please enter a letter and a number on the board.");
  }else{
    firstChar = guess.charAt(0);
    var row = alphabet.index(forstCjar);
    var column = guess.CharAt(1);

    if(isNaN (row) || isNaN(column)){
      alert("Oops,that isn't on the board.")
    }else if(row < 0 || row >= model.boardsize || column < 0 || column >= model.boardSize){
      alert("Oops,that's off the board！");
    }else{
      return row + column;
    }
  }
  return null;
}

var controller = {
  guesses:0,
  
  processGuess:function(guess){
    var lacation = parseGuess(guess);
    if(location){
      this.guesses++;
      var hit = model.fire(lacation);
      if(hit && model.shipsSunk === model.numShips){
        view.displayMessage("You sank all my battlesships,in" + this.guesses + "guesses");
      } 
    }
  }
};

function handleFureButton(){
  var guessInput = document.getElementById("guessInpput");
  var guess = guessInput.value;
  controller.processGuess(guess);
  
  guessInput.value = "";
};

generateShip:function (){
    var direction = Math.floor(Math,random() * 2);
    var row,col;


  if(direction === 1){
    row = Math.floor(Math.random() * this.boardSize);
    col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
  }else{
    row = Math.floor(Math.random() * (this.boardsize - this.shipLength));
    row = Math.floor(Math.random() * this.boardSize);
  }

  var newShipLocations = [];
  for(var i = 0; i < this.shipLength;i++){
    if(direction === 1){
      newShipLocations.push(row + "" + (col + i));
    }else{
      newShipLocations.push((rwo + i) + "" + col);
    }
  }
  return newShipLocations;
}

collision:function(locations){
  for(var i = 0; i  < this.numShips; i ++){
    var ship = model.ships[i];
    for(var j = 0 ; j < locations.length; j++){
      if(ship.location.indexOf(locations[j]) >= 0){
        return true;
      }
    }
  }
  return false;
}

function init(){
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick =handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}



























