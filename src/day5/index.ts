type Point = number[];
type Line = Point[];
type Grid = Point[];

export const parseInput = (input: string): Line[] => input
  .split('\n')
  .map((line) => line.split(' -> ')
    .map((coordinate) => coordinate.split(',')
      .map((point) => parseInt(point, 10))));

const findBounds = (lines: Line[]) => lines.reduce(([maxX, maxY], [[x1, y1], [x2, y2]]) => [
  Math.max(x1, x2, maxX),
  Math.max(y1, y2, maxY),
], [0, 0]);

const createGrid = (width: number, length: number): Grid => [...Array(length)].map(() => [...Array(width)].map(() => 0));

const isStraight = ([p1, p2]: Line) => p1[0] === p2[0] || p1[1] === p2[1];

const pointsInLine = ([[x1, y1], [x2, y2]]: Line) => {
  const xMin = Math.min(x1, x2);
  const xMax = Math.max(x1, x2);
  const yMin = Math.min(y1, y2);
  const yMax = Math.max(y1, y2);

  const points = [];
  if (isStraight([[x1, y1], [x2, y2]])) {
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        points.push([x, y]);
      }
    }
    return points;
  }

  const d = Math.max(xMax - xMin, yMax - yMin) + 1;
  let currY = yMin;
  let currX = y1 === yMin ? x1 : x2;

  const dir = currX < xMax ? 1 : -1;
  for (let i = 0; i < d; i++) {
    points.push([currX, currY]);
    currY++;
    currX += dir;
  }

  return points;
}

const drawLine = (grid: Grid, line: Line) => {
  for (const [x, y] of pointsInLine(line)) {
    grid[y][x]++;
  }
  return grid;
}

const findCrossings = (lines: Line[]) => {
  const [maxX, maxY] = findBounds(lines);
  const grid = createGrid(maxX + 1, maxY + 1);

  for (const line of lines) {
    drawLine(grid, line);
  }

  let safeCrossings = 0;
  for (const row of grid) {
    for (const item of row) {
      if (item >= 2) {
        safeCrossings++;
      }
    }
  }
  return safeCrossings;
}

export const executePart1 = (input: Line[]) => findCrossings(input.filter(isStraight));
export const executePart2 = (input: Line[]) => findCrossings(input);
