/*
DYNAMIC APPROACH - New root is provided every function call, constructing a new graph.
STATIC APPROACH - Static graph, just new starting point for the search algorithm everytime.
*/
//STATIC:

/*class Board {
  constructor(root) {
    this.root = this.coordsToSquare(root);
  }

  coordsToSquare(coords) {
    return new Square(coords);
  }

  createRelation(square) {
    if (!square) return;
    let allMoves = getAllMoves(square.coords);
    allMoves.forEach((element) => {
      if (!discoveredSquares.hasOwnProperty(`${element.toString()}`)) {
        let neighbour = this.coordsToSquare(element);
        square.connectedSquares.push(neighbour);
        discoveredSquares[[element]] = neighbour;
      } else {
        square.connectedSquares.push(discoveredSquares[[element]]);
      }
    });
    square.connectedSquares.forEach((element) => {
      if (element.connectedSquares.length == 0) {
        this.createRelation(element);
      }
    });
  }
}

class Square {
  constructor(coords) {
    this.coords = coords;
    this.connectedSquares = [];
  }
}

const chessBoard = new Board([1, 1]);
const discoveredSquares = {};

chessBoard.createRelation(chessBoard.root);

//console.log(chessBoard);

knightMoves([1, 1], [7, 3]);

//A function to generate the rest of the nodes using the relation between start point and move point being an array of [x, y] where x and y can be either 1, 2, -1, -2

function knightMoves(start, end) {
  start = discoveredSquares[[start]];
  end = discoveredSquares[[end]];
}

function getAllMoves(start) {
  let moves = [];

  //I did the maths and no matter where you are, these are all the possible displacements when moving a knight in chess
  moves.push(addArrayItems(start, [1, 2]));
  moves.push(addArrayItems(start, [1, -2]));
  moves.push(addArrayItems(start, [-1, 2]));
  moves.push(addArrayItems(start, [-1, -2]));
  moves.push(addArrayItems(start, [2, 1]));
  moves.push(addArrayItems(start, [2, -1]));
  moves.push(addArrayItems(start, [-2, 1]));
  moves.push(addArrayItems(start, [-2, -1]));

  return moves.filter((move) => {
    return move !== null;
  });
}

function addArrayItems(array1, array2) {
  let newArray = [];
  let firstNum = array1[0] + array2[0];
  let secondNum = array1[1] + array2[1];

  //Just checks it doesnt get out of the board
  if (firstNum > 0 && firstNum < 9) newArray.push(firstNum);
  if (secondNum > 0 && secondNum < 9) newArray.push(secondNum);
  if (newArray.length < 2) return null;
  return newArray;
}*/
