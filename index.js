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

}

const getMowerInstace = (place, movementsString) => {
  let position = place.split(' ');
  const [x,y,direction] = position;
  const movements = movementsString.split('');
  const mowerInstance = {
    position: {
      x,
      y,
      direction,
    },
    movements,
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