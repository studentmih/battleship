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
  ships:[{ location: ["10", "20", "30"],hits:["","",""]    },
              { location: ["32", "33", "34"],hits:["","",""]   },
              { location: ["63", "64", "65"],hits:["","","hit"]}],
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