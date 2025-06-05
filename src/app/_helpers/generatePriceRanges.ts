const priceRanges = [
  { min: 0, max: 500000 },
  { min: 500000, max: 1000000 },
  { min: 1000000, max: 2000000 },
  { min: 2000000, max: 5000000 },
  { min: 5000000, max: 10000000 },
  { min: 10000000 },
];

export const generatePriceRanges = (
  min: number,
  max: number
): Array<{ min: number; max?: number }> => {
  const ranges: Array<{ min: number; max?: number }> = [];

  priceRanges.forEach((range) => {
    if (
      (range.max === undefined && max >= range.min) || // xử lý mốc không có max
      (range.max !== undefined && min <= range.max && max >= range.min)
    ) {
      ranges.push({ min: range.min, max: range.max });
    }
  });

  return ranges;
};
