const START_DATE = new Date('2024-01-29T00:00:00Z');

export const getYearRange = () => {
  const currentYear = new Date().getFullYear();
  const startYear = START_DATE.getFullYear();

  const years = [];
  for (let y = startYear; y <= currentYear; y++) {
    years.push(y);
  }

  return years;
};

export const getMonthRange = (year: number, startDate = START_DATE) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-based
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();

  let start = 0;
  let end = 11;

  if (year === startYear && year === currentYear) {
    // Năm = START_DATE và = năm hiện tại
    start = startMonth;
    end = currentMonth;
  } else if (year === startYear) {
    // Năm = START_DATE nhưng < năm hiện tại
    start = startMonth;
    end = 11;
  } else if (year === currentYear) {
    // Năm = năm hiện tại (nhưng > START_DATE)
    start = 0;
    end = currentMonth;
  } else {
    // Nằm giữa → đủ 12 tháng
    start = 0;
    end = 11;
  }

  return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
};
