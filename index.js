process.stdin.resume();
process.stdin.setEncoding('utf8');

// your code goes here

const readline = require('readline');

let input = [];

const rl = readline.createInterface({
    input: process.stdin,
    ouput: process.stout,
    terminal: false,
})



rl.on('line', (line) => {
    input.push(line);
})

rl.on('close', () => {
    main(input);
})

const main = (input) => {
  const [limitZone, ...mowersTest] = input;
  const mowers = getMoversTestObjects(mowersTest);
  let state = {
    limitZone,
    mowers,
  }

  for (let mower of mowers) {
    //test actions 
    console.log(mower);
    state = playMowerActions(mower, state);
  }

}

const playMowerActions = (mower, state) => {
  const { actions, position } = mower;
  let mowerAfterAction = {...mower};
  for (let action of actions) {
    if (isChangeDirectionAction(action)) {
       mowerAfterAction.position.direction = getNextDirection(position.direction, action);
    }
  }

}

const isChangeDirectionAction = (action) => action === 'G' || action === 'D';

const isMovementAction = (action) => {
}

const getNextDirection = (currentDirection, pivot) => {
  let nextDirection = '';
  const DIRECTION_MAP = {
    'D': 1,
    'G': -1
  }
  const cardinalDirections = ['N', 'E', 'S', 'W'];
  const directionIndex = cardinalDirections.indexOf(currentDirection);
  const nextDirectionIndex = directionIndex + DIRECTION_MAP[pivot];
  if (nextDirectionIndex < 0) {  
    return cardinalDirections[cardinalDirections.length - 1];
  } else if (nextDirectionIndex > cardinalDirections.length - 1) {
    return cardinalDirections[0];
  }
  nextDirection = cardinalDirections[nextDirectionIndex];
  return nextDirection;
}

const getMowerInstace = (positionString, actionsString) => {
  let position = positionString.split(' ');
  const [x,y,direction] = position;
  const actions = actionsString.split('');
  const mowerInstance = {
    position: {
      x,
      y,
      direction,
    },
    actions,
  }
  return mowerInstance;
}

const getMoversTestObjects = (mowersTest) => {
  let mowers = [];
  for (let mowerIndex = 0; mowerIndex < mowersTest.length; mowerIndex+=2) {
    const position = mowersTest[mowerIndex]
    const movements = mowersTest[mowerIndex+1]
    mowers.push(getMowerInstace(position, movements))
  }
  return mowers;
}