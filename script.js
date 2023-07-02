let ScrabbleTiles = [
  { "letter": "A", "value": 1, "original": 9, "amount": 9 },
  { "letter": "B", "value": 3, "original": 2, "amount": 2 },
  { "letter": "C", "value": 3, "original": 2, "amount": 2 },
  { "letter": "D", "value": 2, "original": 4, "amount": 4 },
  { "letter": "E", "value": 1, "original": 12, "amount": 12 },
  { "letter": "F", "value": 4, "original": 2, "amount": 2 },
  { "letter": "G", "value": 2, "original": 3, "amount": 3 },
  { "letter": "H", "value": 4, "original": 2, "amount": 2 },
  { "letter": "I", "value": 1, "original": 9, "amount": 9 },
  { "letter": "J", "value": 8, "original": 1, "amount": 1 },
  { "letter": "K", "value": 5, "original": 1, "amount": 1 },
  { "letter": "L", "value": 1, "original": 4, "amount": 4 },
  { "letter": "M", "value": 3, "original": 2, "amount": 2 },
  { "letter": "N", "value": 1, "original": 6, "amount": 6 },
  { "letter": "O", "value": 1, "original": 8, "amount": 8 },
  { "letter": "P", "value": 3, "original": 2, "amount": 2 },
  { "letter": "Q", "value": 10, "original": 1, "amount": 1 },
  { "letter": "R", "value": 1, "original": 6, "amount": 6 },
  { "letter": "S", "value": 1, "original": 4, "amount": 4 },
  { "letter": "T", "value": 1, "original": 6, "amount": 6 },
  { "letter": "U", "value": 1, "original": 4, "amount": 4 },
  { "letter": "V", "value": 4, "original": 2, "amount": 2 },
  { "letter": "W", "value": 4, "original": 2, "amount": 2 },
  { "letter": "X", "value": 8, "original": 1, "amount": 1 },
  { "letter": "Y", "value": 4, "original": 2, "amount": 2 },
  { "letter": "Z", "value": 10, "original": 1, "amount": 1 },
  { "letter": "_", "value": 0, "original": 2, "amount": 2 }
];

function generateTile(button) {
  // Generate 7 random tiles, deduct from the bag
  // Update the "amount" of tiles
  // Replace tile, put back into the bag, draw n tiles again
  // Checks whether tiles are empty
  for (let i = 1; i <= 7; i++) {
    if (document.getElementById("tile" + i).getAttribute('src') == '') {
      // n is the total number of available tiles, if its 0, ignore the for loop below
      var n = 0;

      for (let i = 0; i < 27; i++) {
        if (ScrabbleTiles[i].amount > 0) {
          n += 1;
        }
      }

      // Currently 7, but will change for dynamically refill the deck and not 7, e.g. refill 3 tiles etc
      if (n >= 7) {
        for (let i = 1; i <= 7; i++) {
          let letter = Math.floor(Math.random() * 27);
          while (ScrabbleTiles[letter].amount == 0) {
            letter = Math.floor(Math.random() * 27);
          }
          ScrabbleTiles[letter].amount = ScrabbleTiles[letter].amount - 1;
          console.log(ScrabbleTiles[letter]);

          // Add that tile to the empty slot of the rack
          document.getElementById("tile" + i).src = "Scrabble_Tile_" + ScrabbleTiles[letter].letter + ".jpg";



        }
      }
      else {
        for (let i = 0; i < n; i++) {
          let letter = Math.floor(Math.random() * 27);
          while (ScrabbleTiles[letter].amount == 0) {
            letter = Math.floor(Math.random() * 27);
          }
          ScrabbleTiles[letter].amount = ScrabbleTiles[letter].amount - 1;
          console.log(ScrabbleTiles[letter]);
        }
      }
    }
  }

};
// Drag and Drop Function
// I changed this - Bill


// var tileIds = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7"];
// var dragItems = [];

// for (var i = 0; i < tileIds.length; i++) {
//   var dragItem = document.getElementById(tileIds[i]);
//   dragItems.push(dragItem);
// }

var dragItem = document.getElementById("tile1");

var dropLocation = document.querySelectorAll(".cell, .triple-word-cell ,.triple-letter-cell, .double-letter-cell, .double-word-cell, .center-star-cell");
  

dragItem.ondragstart = function (event) {
  event.dataTransfer.setData('key', event.target.id);
  console.log("dragging");
  console.log(event.target.id);
};

dropLocation.forEach(dropLocation => {
  dropLocation.ondragover = function (event) {
    event.preventDefault();
    console.log("over location");
  };
});
dropLocation.forEach(dropLocation => {
  dropLocation.ondrop = function (event) {
    var droptItem = event.dataTransfer.getData('key');
    event.preventDefault();
    var myElement = document.getElementById(droptItem);
    var myNewElement = document.createElement('img');
    myNewElement.src = myElement.src;
    dropLocation.appendChild(myNewElement);
  }
});

// Order Cell Toggle Button
function orderCellToggleSwitch(button) {
  var cell = button.parentNode;
  var orderCells = document.querySelectorAll('.scrabble-board .order-cell');

  if (button.innerHTML === '◯') {
    button.innerHTML = '|';
    button.classList.add('on');
    cell.classList.add('on');

    // Add custom styles to .scrabble-board .order-cell when toggle is ON
    orderCells.forEach(function (orderCell) {
      orderCell.style.color = 'black'; // Update with your desired color
    });
  } else {
    button.innerHTML = '◯';
    button.classList.remove('on');
    cell.classList.remove('on');

    // Remove custom styles from .scrabble-board .order-cell when toggle is OFF
    orderCells.forEach(function (orderCell) {
      orderCell.style.color = '#62F0DC'; // Update with your desired color
    });
  }
}