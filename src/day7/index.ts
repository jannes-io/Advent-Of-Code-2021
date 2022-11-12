const { abs, max, min } = Math;

export const parseInput = (input: string): number[] => input.split(',').map((n) => parseInt(n, 10));

const range = (start: number, end: number) => [...Array(end - start)]
  .map((_, n) => n + start);

const fn = (n: number, v: number, fv: Function) => fv(abs(n - v));
const id = (n: number) => n;
const triN = (n: number) => ((n / 2) * (n + 1));

const minFuel = (input: number[], exec: Function) => min(...range(min(...input), max(...input))
  .map((v) => input.reduce((f, n) => f + fn(n, v, exec), 0)));

export const executePart1 = (input: number[]) => minFuel(input, id);
export const executePart2 = (input: number[]) => minFuel(input, triN);
