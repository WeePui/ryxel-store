const calcYearDiff = (date1: Date, date2: Date) => {
  const yearDiff = date2.getFullYear() - date1.getFullYear();
  const monthDiff = date2.getMonth() - date1.getMonth();
  const dayDiff = date2.getDate() - date1.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return yearDiff - 1;
  }

  return yearDiff;
};

export default calcYearDiff;
