const formatCurrency = (amount: number, currency = 'VND') => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(
    amount
  );
};

export default formatCurrency;
