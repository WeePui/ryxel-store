import { getOrderByOrderCode } from '@/app/_libs/apiServices';
import { Address } from '@/app/_types/address';
import { LineItem } from '@/app/_types/lineItem';
import { Product } from '@/app/_types/product';
import formatMoney from '@/app/_utils/formatMoney';
import { cookies } from 'next/headers';
import '@styles/print.css';

interface PageProps {
  params: Promise<{
    orderCode: string;
  }>;
}

export default async function page({ params }: PageProps) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');
  if (!token) {
    throw new Error('Chưa đăng nhập');
  }
  const { orderCode } = await params;
  const { data: orderData } = await getOrderByOrderCode(orderCode, token!);
  const { order } = orderData;

  const shippingAddress = order.shippingAddress as Address;

  const orderDetails = {
    customer: {
      name: `${shippingAddress.fullname} (${order.user.name})`,
      phone: shippingAddress.phoneNumber,
    },
    orderCode,
    shippingAddress: `${shippingAddress.address}, ${shippingAddress.ward.name}, ${shippingAddress.district.name}, ${shippingAddress.city.name}`,
    createdAt: new Date(order.createdAt).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  };

  return (
    <div className="print-page">
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-bold">RYXEL COMPANY</h1>
        <div className="text-xs text-grey-400">
          <p>1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP. Hồ Chí Minh</p>
          <p>(+84) 912 823 823 | bhtcag@gmail.com</p>
        </div>
      </div>
      <h3 className="text-lg font-bold mb-4">
        Đơn hàng #{orderDetails.orderCode}
      </h3>

      <p>
        <strong>Khách hàng:</strong> {orderDetails.customer.name}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {orderDetails.shippingAddress}
      </p>
      <p>
        <strong>SĐT:</strong> {orderDetails.customer.phone}
      </p>
      <p>
        <strong>Ngày đặt:</strong> {orderDetails.createdAt}
      </p>
      <p className="text-right italic text-xs">
        Ngày in {new Date().toLocaleDateString('vi-VN')}
      </p>

      <hr className="my-4" />

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-1">Sản phẩm</th>
            <th className="text-right py-1">Số lượng</th>
            <th className="text-right py-1">Đơn giá</th>
            <th className="text-right py-1">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.lineItems.map((item: LineItem) => (
            <tr key={item.variant as string} className="border-b py-2">
              <td>{(item.product as Product).name}</td>
              <td className="text-right">{item.quantity}</td>
              <td className="text-right">{formatMoney(item.unitPrice!)}</td>
              <td className="text-right">{formatMoney(item.subtotal!)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="mt-6 ml-auto text-sm w-1/2">
        <tbody>
          <tr>
            <td className="text-left py-1">Tạm tính</td>
            <td className="text-right py-1">{formatMoney(order.subtotal)}</td>
          </tr>
          <tr>
            <td className="text-left py-1">Phí vận chuyển</td>
            <td className="text-right py-1">
              {formatMoney(order.shippingFee)}
            </td>
          </tr>
          {order.discountAmount > 0 && (
            <tr>
              <td className="text-left py-1">Giảm giá</td>
              <td className="text-right py-1">
                -{formatMoney(order.discountAmount)}
              </td>
            </tr>
          )}
          <tr className="text-lg font-bold">
            <td className="text-left py-2">Tổng cộng</td>
            <td className="text-right py-2">{formatMoney(order.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
