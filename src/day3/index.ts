export const parseInput = (input: string) => input.split('\n').map((n) => n.split(''));

export const executePart1 = (input: string[][]) => {
  const columns = input[0].map((n, i) => input.map((row) => row[i]));
  const [mostCommon, leastCommon] = columns.reduce(([most, least], col) => {
    const zero = col.filter((n) => n === '0').length;
    const one = col.filter((n) => n === '1').length;

    return [
      most + (zero > one ? '0' : '1'),
      least + (zero > one ? '1' : '0')
    ];
  }, ['', '']);

  return parseInt(mostCommon, 2) * parseInt(leastCommon, 2);
};

const filterRatings = (filter: (zero: number, one: number) => string) => (rows: string[][], col: number) => {
  const columns = rows[0].map((n, i) => rows.map((row) => row[i]));

  const zero = columns[col].filter((n) => n === '0').length;
  const one = columns[col].filter((n) => n === '1').length;

  const filterVal = filter(zero, one);

  return rows.filter((val) => val[col] === filterVal);
};

const findRatings = (input: string[][], filter: (zero: number, one: number) => '0' | '1') => {
  let i = 0;
  let ratings = input;
  const filterFn = filterRatings(filter);
  while (ratings.length > 1) {
    ratings = filterFn(ratings, i);
    i++;
  }
  return ratings[0].join('');
}

export const executePart2 = (input: string[][]) => {
  const oxygenRatings = findRatings(input, (zero, one) => zero > one ? '0' : '1');
  const co2Ratings = findRatings(input, (zero, one) => zero > one ? '1' : '0')

  return parseInt(oxygenRatings, 2) * parseInt(co2Ratings, 2);
};
