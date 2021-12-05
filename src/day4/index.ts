type Board = number[][];

interface Game {
  numbers: number[];
  boards: Board[];
}

interface Result {
  n: number;
  board: Board;
}

interface GameResult {
  winner: Result;
  loser: Result;
}

const parseDec = (n: string) => parseInt(n, 10);

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

const playRound = (number: number, boards: Board[]) => {
  let winner: Board | undefined;
  const remaining = [];

  const mark = markNumbers(number);
  for (const board of boards) {
    mark(board);
    if (checkBoard(board)) {
      winner = board;
    } else {
      remaining.push(board);
    }
  }
  return { winner, remaining };
}

const runBingo = (game: Game) => {
  let remaining = game.boards;
  let winner;
  let loser;

  const numbers = game.numbers.reverse();
  while (remaining.length !== 0) {
    const currentNumber = numbers.pop();
    const roundResult = playRound(currentNumber, remaining);

    if (winner === undefined && roundResult.winner !== undefined) {
      winner = { n: currentNumber, board: roundResult.winner };
    }
    loser = { n: currentNumber, board: roundResult.winner };

    remaining = roundResult.remaining;
  }
  return { winner, loser };
}

const calculateResult = ({ board, n }: Result) => {
  const numbers = board.reduce((all, row) => [...all, ...row.filter((number) => number !== -1)], []);
  const sum = numbers.reduce((acc, number) => acc + number, 0);

  return sum * n;
}

export const parseInput = (input: string): GameResult => {
  const [x, ...xs] = input.split('\n');

  const numbers = x.split(',').map(parseDec);

  let rows = xs.filter(Boolean).map((row) => row.split(' ').filter(Boolean).map((n) => parseDec(n.trim())));
  let boards = [];
  while (rows.length) {
    boards.push(rows.splice(0, 5));
  }

  return runBingo({
    numbers,
    boards,
  });
};

export const executePart1 = (input: GameResult) => calculateResult(input.winner);

export const executePart2 = (input: GameResult) => calculateResult(input.loser);
