export const mappingShippingStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    ready_to_pick: 'Đã tạo đơn vận chuyển',
    picked: 'Đơn vị vận chuyển đã lấy hàng',
    storing: 'Hàng đang nằm ở kho',
    transporting: 'Đang luân chuyển hàng',
    sorting: 'Đang phân loại hàng hóa',
    delivering: 'Đơn vị vận chuyển đang giao cho người nhận',
    delivered: 'Giao hàng thành công',
    delivery_fail: 'Giao hàng thất bại',
    return: 'Trả hàng',
    returned: 'Trả hàng thành công',
    lost: 'Hàng bị mất',
    damage: 'Hàng bị hư hỏng',
    exception: 'Đơn hàng ngoại lệ',
    refunded: 'Đã hoàn tiền',
  };

  return statusMap[status] || status;
};
