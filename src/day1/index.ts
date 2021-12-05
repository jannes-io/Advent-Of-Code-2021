export const parseInput = (input: string) => input.split('\n').map((v: string) => parseInt(v, 10));

const countIncreases = (count: number, n: number, i: number, input: number[]) => ((input[i - 1] || Infinity) < n) ? count + 1 : count;

export const executePart1 = (input: number[]) => input
  .reduce(countIncreases, 0);

export const executePart2 = (input: number[]) => input
  .reduce((groups, n, i) => i < 2 ? groups : [...groups, n + input[i - 1] + input[i - 2]], [])
  .reduce(countIncreases, 0);
