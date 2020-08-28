const { CARDINAL_DIRECTIONS, DIRECTION_MOVE_MAP } = require('./consts');
const { isChangeDirectionAction, isCollide, isMowerOutOfZone, isMovementAction } = require('./checkers');

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
  mowersTest = getMoversTestObjects(mowersTest);
  let state = { limitZone, mowers: mowersTest }
  state.mowers.forEach((mower, index) => {
    state = playMowerActions(mower, state, index);
  });
  printMowersPosition(state.mowers);
}

const printMowersPosition = (mowers) => (
  mowers.forEach(({position}) => {
    const {x,y,direction} = position;
    console.log(`${x} ${y} ${direction}`);
  })
)

const playMowerActions = (mower, state, mowerIndex) => {
  let localState = {...state};
  const { limitZone } = state;
  const { actions } = mower;
  let mowerAfterAction = {...mower};
  for (let action of actions) {
    let { position } = mowerAfterAction
    if (isChangeDirectionAction(action)) {
      mowerAfterAction.position.direction = getNextDirection(position.direction, action);
    } else if (isMovementAction(action)) {
      const nextPosition = getNextPosition(position)
      if (!isMowerOutOfZone(nextPosition, limitZone)
        && !isCollide(nextPosition, localState)) {
        mowerAfterAction.position = nextPosition;
      }
    }
    localState = upDateState(mowerAfterAction, mowerIndex, localState);
  }
  return localState;
}

const upDateState = (updatedMower, mowerIndex, state) => {
  const localState = {...state};
  localState.mowers[mowerIndex] = {...updatedMower};
  return localState;
}

const getNextDirection = (currentDirection, pivot) => {
  let nextDirection = '';
  const cardinalDirections = ['N', 'E', 'S', 'W'];
  const lastCardinalDirectionIndex = cardinalDirections.length - 1;
  const directionIndex = cardinalDirections.indexOf(currentDirection);
  const nextDirectionIndex = directionIndex + DIRECTION_MOVE_MAP[pivot];
  if (nextDirectionIndex < 0) {  
    return cardinalDirections[lastCardinalDirectionIndex];
  } else if (nextDirectionIndex > lastCardinalDirectionIndex) {
    return cardinalDirections[0];
  }
  nextDirection = cardinalDirections[nextDirectionIndex];
  return nextDirection;
}

const getMowerInstaceObject = (positionString, actionsString) => {
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
    mowers.push(getMowerInstaceObject(position, movements))
  }
  return mowers;
}

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
    direction,
  }
}