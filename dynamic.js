class Square {
  constructor(coords) {
    this.coords = coords;
    this.legalMoves = [];
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }
}

let path;
const discoveredSquares = {};
/*
        const old = {};
        const current = {};
        const next = {};*/

/*function knightMoves(start, end) {
          let next = {};
          let old = {};
          let current = {};
          current[[start]] = new Square(start);
        
          while (true) {
            if (current.hasOwnProperty(`${end.toString()}`))
              return "FOUND " + current[end].coords;
            Object.keys(current).forEach((cell) => {
              let nextCells = getAllMoves(current[cell].coords);
              for (let i = 0; i < nextCells.length; i++) {
                if (
                  !old.hasOwnProperty(nextCells[i].toString()) &&
                  !current.hasOwnProperty(nextCells[i].toString()) &&
                  !next.hasOwnProperty(nextCells[i].toString())
                ) {
                  if (nextCells[i].coords) next[[nextCells[i].coords]] = nextCells[i];
                }
              }
              old[[current[cell].coords]] = current[cell];
            });
            current = next;
          }
        }*/

function createTree(start, end) {
  let root = coordsToNode(start);
  path = new Tree(root);
  return knightMoves(root, end);
}

function knightMoves(start, end) {
  let current;
  if (
    Array.isArray(start) &&
    !discoveredSquares.hasOwnProperty(start.toString())
  ) {
    console.log("Not in discovered");
    current = new Square(start);
  } else {
    current = start;
  }

  for (let i = 0; i < current.legalMoves.length; i++) {
    if (current.legalMoves[i].coords == end) return "a";
  }

  current.legalMoves = getAllMoves(current.coords);
  discoveredSquares[[current.coords]] = current;

  current.legalMoves.forEach((node) => {
    /*if (node.legalMoves.length == 0) {
            console.log(node.coords);
            return knightMoves(node, end);
          }*/
    if (discoveredSquares.hasOwnProperty[node.toString()]) {
      console.log(node);
      console.log(discoveredSquares.hasOwnProperty(node.coords.toString()));
      return knightMoves(node, end);
    }
  });
}

console.log(createTree([1, 1], [4, 3]));

function coordsToNode(coords) {
  return new Square(coords);
}

function searchTree(element, matchingCoords) {
  if (element.coords.toString() === matchingCoords.toString()) {
    return true;
  } else if (element.legalMoves != null) {
    let result = null;
    for (let i = 0; result == null && i < element.legalMoves.length; i++) {
      result = searchTree(element.legalMoves[i], matchingCoords);
    }
    return result;
  }
  return null;
}

function getAllMoves(start) {
  const moves = [];

  //I did the maths and no matter where you are, these are all the possible displacements when moving a knight in chess
  moves.push(new Square(addArrayItems(start, [1, 2])));
  moves.push(new Square(addArrayItems(start, [1, -2])));
  moves.push(new Square(addArrayItems(start, [-1, 2])));
  moves.push(new Square(addArrayItems(start, [-1, -2])));
  moves.push(new Square(addArrayItems(start, [2, 1])));
  moves.push(new Square(addArrayItems(start, [2, -1])));
  moves.push(new Square(addArrayItems(start, [-2, 1])));
  moves.push(new Square(addArrayItems(start, [-2, -1])));

  return moves.filter((move) => {
    return move.coords !== null;
  });
}

function addArrayItems(array1, array2) {
  //console.log(array1);
  const newArray = [];
  let firstNum = array1[0] + array2[0];
  let secondNum = array1[1] + array2[1];

  //Just checks it doesnt get out of the board
  if (firstNum > 0 && firstNum < 9) newArray.push(firstNum);
  if (secondNum > 0 && secondNum < 9) newArray.push(secondNum);
  if (newArray.length < 2) return null;
  return newArray;
}
