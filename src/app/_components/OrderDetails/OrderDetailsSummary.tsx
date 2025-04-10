import { Order } from '@/app/_types/order';
import formatCurrency from '@/app/_utils/formatCurrency';
import { mappingPaymentMethodText } from '@/app/_utils/mappingPaymentMethodText';

interface OrderDetailsSummaryProps {
  order: Order;
}

export default function OrderDetailsSummary({
  order,
}: OrderDetailsSummaryProps) {
  return (
    <div>
      <div className="flex bg-primary-50 p-4">
        <table className="flex items-center text-right gap-4 text-sm justify-self-end ml-auto">
          <thead>
            <tr className="flex flex-col justify-center">
              <th>Tổng tiền hàng:</th>
              <th>Giảm giá:</th>
              <th>Phí vận chuyển:</th>
              <th className="h-7 flex items-center justify-end">Tổng tiền:</th>
              <th>Phương thức thanh toán:</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex flex-col justify-center">
              <td>{formatCurrency(order.subtotal)}</td>
              <td>- {formatCurrency(order.discountAmount)}</td>
              <td>{formatCurrency(order.shippingFee)}</td>
              <td className="font-bold text-xl">
                {formatCurrency(order.total)}
              </td>
              <td>{mappingPaymentMethodText[order.paymentMethod]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
