export const parseInput = (input: string) => input.split('\n').map((v: string) => v.split(' '));

export const executePart1 = (input: string[][]) => input.reduce(([depth, pos], [mov, x]) => {
  const n = parseInt(x, 10);
  if (mov === 'forward') {
    return [depth, pos + n];
  }
  if (mov === 'down') {
    return [depth + n, pos];
  }
  if (mov === 'up') {
    return [depth - n, pos];
  }
}, [0, 0]).reduce((acc, n) => acc * n);

export const executePart2 = (input: string[][]) => {
  const [depth, pos] = input.reduce(([depth, pos, aim], [mov, x]) => {
    const n = parseInt(x, 10);
    if (mov === 'forward') {
      return [depth + aim * n, pos + n, aim];
    }
    if (mov === 'down') {
      return [depth, pos, aim + n];
    }
    if (mov === 'up') {
      return [depth, pos, aim - n];
    }
  }, [0, 0, 0]);

  return depth * pos;
}
