process.stdin.resume();
process.stdin.setEncoding('utf8');

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
  let [limitZone, ...mowersTest] = input;
  limitZone = getLimitZoneObject(limitZone);
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
  const { limitZone } = state;
  const { actions, position } = mower;
  let mowerAfterAction = {...mower};
  for (let action of actions) {
    console.log(action);
    if (isChangeDirectionAction(action)) {
      mowerAfterAction.position.direction = getNextDirection(position.direction, action);
    } else if (isMovementAction(action)) {
      const nextPosition = getNextPosition(position)
      if (!isMowerOutOfZone(nextPosition, limitZone)) {
        mowerAfterAction.position = nextPosition;
      }
    }
  }

}

const isMowerOutOfZone = ({x, y}, limit) => (
  isHoritonzalOut(x, limit) || isVerticalOut(y, limit)
);

const isHoritonzalOut = (x, limit) => (x < 0 || x > limit.x)
const isVerticalOut = (y, limit) => (y < 0 || y > limit.x)

const getNextPosition = (position) => {
  let { x,y,direction } = position;
  if (direction === CARDINAL_DIRECTIONS.NORD) {
    y++;
  } else if (direction === CARDINAL_DIRECTIONS.EAST) {
    x++;
  } else if (direction === CARDINAL_DIRECTIONS.WEST) {
    x--;
  } else {
    y--;
  }
  return {
    x,
    y,
    direction
  }

}


const CARDINAL_DIRECTIONS = {
  NORD: 'N',
  EAST: 'E',
  SOUTH: 'S',
  WEST: 'W'
}

const isChangeDirectionAction = (action) => action === 'G' || action === 'D';

const isMovementAction = (action) => action === 'A';

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
  let [x,y,direction] = position;
  const actions = actionsString.split('');
  x = Number(x);
  y = Number(y);
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

const getLimitZoneObject = (limitZoneText) => {
  let limitZone = limitZoneText.split(' ');
  let [x, y] = limitZone;
  x = Number(x);
  y = Number(y);
  return { x, y };
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