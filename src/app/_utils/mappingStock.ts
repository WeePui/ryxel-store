export const mappingStock = (
  stock: number
): { text: string; color: string } => {
  if (stock > 20) {
    return {
      text: 'Còn hàng',
      color: '#22c55e',
    };
  } else if (stock === 0) {
    return {
      text: 'Hết hàng',
      color: '#ef4444',
    };
  } else if (stock <= 20 && stock > 0) {
    return {
      text: 'Sắp hết hàng',
      color: '#f97316',
    };
  } else {
    return {
      text: 'Không xác định',
      color: '#6b7280',
    };
  }
};
