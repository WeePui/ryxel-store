import OrderStat from '@/app/_components/Admin/Orders/OrderStat';
import { FaCheckCircle, FaHistory, FaReceipt, FaTruck } from 'react-icons/fa';
import Card from '../../UI/Card';
import { FaHandshakeSimpleSlash } from 'react-icons/fa6';

interface OrderStatCardProps {
  totalOrders: {
    value: number;
    changeRate: number;
  };
  totalPendingOrders: {
    value: number;
    changeRate: number;
  };
  totalShippedOrders: {
    value: number;
    changeRate: number;
  };
  totalDeliveredOrders: {
    value: number;
    changeRate: number;
  };
  totalCancelOrders: {
    value: number;
    changeRate: number;
  };
}

export default function OrderStatCard({
  totalOrders,
  totalPendingOrders,
  totalShippedOrders,
  totalDeliveredOrders,
  totalCancelOrders,
}: OrderStatCardProps) {
  return (
    <Card className="flex items-center justify-between py-6 px-8 gap-2 flex-wrap">
      <OrderStat
        title="Tổng đơn hàng"
        icon={<FaReceipt />}
        iconColor="#FF9F00"
        value={totalOrders.value}
        changeRate={totalOrders.changeRate}
      />
      <OrderStat
        title="Chờ xác nhận"
        icon={<FaHistory />}
        iconColor="#309898"
        value={totalPendingOrders.value}
        changeRate={totalPendingOrders.changeRate}
      />
      <OrderStat
        title="Đang vận chuyển"
        icon={<FaTruck />}
        iconColor="#547792"
        value={totalShippedOrders.value}
        changeRate={totalShippedOrders.changeRate}
      />
      <OrderStat
        title="Đã giao"
        icon={<FaCheckCircle />}
        iconColor="#67AE6E"
        value={totalDeliveredOrders.value}
        changeRate={totalDeliveredOrders.changeRate}
      />
      <OrderStat
        title="Đã hủy"
        icon={<FaHandshakeSimpleSlash />}
        iconColor="#8E1616"
        value={totalCancelOrders.value}
        changeRate={totalCancelOrders.changeRate}
      />
    </Card>
  );
}
