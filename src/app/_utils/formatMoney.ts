const formatMoney = (amount: number, currency = 'VND') => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(
    amount
  );
};

export default formatMoney;

export function formatMoneyCompact(amount: number) {
  if (Math.abs(amount) > 1000000000) {
    return (amount / 1000000000).toFixed(2) + ' tỷ';
  } else if (Math.abs(amount) > 1000000) {
    return (amount / 1000000).toFixed(2) + ' triệu';
  } else if (Math.abs(amount) > 1000) {
    return (amount / 1000).toFixed(2) + ' nghìn';
  } else return amount + ' VND';
}
