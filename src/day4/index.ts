type Board = number[][];

interface Game {
  numbers: number[];
  boards: Board[];
}

const parseDec = (n: string) => parseInt(n, 10);

export const parseInput = (input: string): Game => {
  const [x, ...xs] = input.split('\n');

  const numbers = x.split(',').map(parseDec);

  let rows = xs.filter(Boolean).map((row) => row.split(' ').filter(Boolean).map((n) => parseDec(n.trim())));
  let boards = [];
  while (rows.length) {
    boards.push(rows.splice(0, 5));
  }

  return {
    numbers,
    boards,
  }
};

const markNumbers = (n: number) => (board: Board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === n) {
        board[i][j] = -1;
      }
    }
  }
  return board;
}

const checkRow = (row: number[]) => row.reduce((acc, n) => acc + n) === -5;

const checkGrid = (board: number[][]) => {
  for (const row of board) {
    if (checkRow(row)) {
      return true;
    }
  }
  return false;
}

const checkBoard = (board: Board) => checkGrid(board) || checkGrid(board[0].map((n, i) => board.map((row) => row[i])))

const findWinner = (game: Game) => {
  for (const n of game.numbers) {
    const mark = markNumbers(n);
    for (const board of game.boards) {
      if (checkBoard(mark(board))) {
        return { board, n };
      }
    }
  }
  throw Error('No winning board found!');
}

export const executePart1 = (input: Game) => {
  const { board, n } = findWinner(input);
  const numbers = board.reduce((all, row) => [...all, ...row.filter((number) => number !== -1)], []);
  const sum = numbers.reduce((acc, number) => acc + number);

  return sum * n;
};

export const executePart2 = (input: Game) => 0;
