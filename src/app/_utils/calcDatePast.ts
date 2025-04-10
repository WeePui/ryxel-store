export function calcDatePast(date: string) {
  const currentDate = new Date();
  const pastDate = new Date(date);
  const diffTime = Math.abs(currentDate.getTime() - pastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 365) {
    return `${Math.floor(diffDays / 365)} năm trước`;
  }

  if (diffDays > 30) {
    return `${Math.floor(diffDays / 30)} tháng trước`;
  }

  if (diffDays > 7) {
    return `${Math.floor(diffDays / 7)} tuần trước`;
  }

  if (diffDays > 1) {
    return `${diffDays} ngày trước`;
  }

  return 'Hôm nay';
}
