const isCollide = ({x, y}, state) => {
  const { mowers } = state;
  return mowers.some(({position}) => {
    return position.x === x && position.y === y;
  })
}

const isMowerOutOfZone = ({x, y}, limit) => (
  isHoritonzalOut(x, limit) || isVerticalOut(y, limit)
);

const isHoritonzalOut = (x, limit) => (x < 0 || x > limit.x)

const isVerticalOut = (y, limit) => (y < 0 || y > limit.y)

const isChangeDirectionAction = (action) => action === 'G' || action === 'D';

const isMovementAction = (action) => action === 'A';

module.exports = {
  isCollide,
  isMowerOutOfZone,
  isChangeDirectionAction,
  isMovementAction,
}
