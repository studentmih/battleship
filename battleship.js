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
var ship1 = [{ location: ["10", "20", "30"],hits:["","",""]},
            { location: ["32", "33", "34"],hits:["","",""]},
            { location: ["63", "64", "65"],hits:["","","hit"]}];