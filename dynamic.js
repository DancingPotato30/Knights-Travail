class Square {
  constructor(coords) {
    this.coords = coords;
    this.legalMoves = [];
    this.parent = null;
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }
}

let path;
const discoveredSquares = {};

const old = {};
const current = {};
const next = {};

function knightMoves(start, end) {
  if (end[0] > 8 || end[0] < 1 || end[1] < 1 || end[1] > 8)
    return "INVALID INPUT";
  let next = {};
  let old = {};
  let current = {};
  let root = new Square(start);
  current[[start]] = root;
  let counter = 0;
  let nextCells;
  let parent;

  while (true) {
    if (current.hasOwnProperty(`${end.toString()}`)) {
      createTree(root);
      console.log(`Found it in ${counter} moves! Your full path: `);
      getPath(end, old, counter);
      return end.toString();
    }
    parent = current;
    Object.keys(current).forEach((cell) => {
      nextCells = getAllMoves(current[cell].coords);
      for (let i = 0; i < nextCells.length; i++) {
        nextCells[i].parent = current[cell];
      }
      current[cell].legalMoves = nextCells;
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
    next = {};
    counter++;
  }
}

function getPath(end, old, counter) {
  let fullPath = [];
  let root = searchTree(path.root, end);
  for (let i = 0; i < counter; i++) {
    root = root.parent;
    fullPath.push(root.coords.toString());
  }
  for (let i = fullPath.length - 1; i >= 0; i--) {
    console.log(fullPath[i]);
  }
}

function createTree(root) {
  path = new Tree(root);
  bfs(root);
}

function bfs(root) {
  let queue = [];
  queue.push(root);
  while (queue.length > 0) {
    let node = queue.shift();
    for (let i = 0; i < node.legalMoves.length; i++) {
      queue.push(node.legalMoves[i]);
    }
  }
}

console.log(knightMoves([5, 3], [2, 2]));

function coordsToNode(coords) {
  return new Square(coords);
}

function searchTree(element = path.root, matchingCoords) {
  if (element.coords.toString() === matchingCoords.toString()) {
    return element;
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
  const newArray = [];
  let firstNum = array1[0] + array2[0];
  let secondNum = array1[1] + array2[1];

  //Just checks it doesnt get out of the board
  if (firstNum > 0 && firstNum < 9) newArray.push(firstNum);
  if (secondNum > 0 && secondNum < 9) newArray.push(secondNum);
  if (newArray.length < 2) return null;
  return newArray;
}
