export const generatePriceRanges = (min, max) => {
  const priceRanges = [
    { min: 0, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: 500 },
    { min: 500, max: 1000 },
    { min: 1000 },
  ];
  const ranges = [];
  priceRanges.forEach((range) => {
    if (min <= range.max && max >= range.min) {
      ranges.push(range);
    }
  });
  return ranges;
};
