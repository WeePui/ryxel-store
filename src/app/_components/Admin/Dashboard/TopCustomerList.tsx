import { User } from '@/app/_types/user';
import formatMoney from '@/app/_utils/formatMoney';
import Image from 'next/image';

interface TopCustomerListProps {
  topCustomers: {
    user: User;
    totalSpent: number;
    totalOrders: number;
  }[];
}

export default function TopCustomerList({
  topCustomers,
}: TopCustomerListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {topCustomers && topCustomers.length > 0 ? (
        topCustomers.map((customer) => (
          <TopCustomerListItem
            key={customer.user._id}
            user={customer.user}
            totalSpent={customer.totalSpent}
            totalOrders={customer.totalOrders}
          />
        ))
      ) : (
        <li className="text-grey-300 font-medium text-center">
          Store gì mà nó ế bỏ mẹ 😞.
        </li>
      )}
    </ul>
  );
}

interface TopCustomerListItemProps {
  user: User;
  totalSpent: number;
  totalOrders: number;
}

function TopCustomerListItem({
  user,
  totalSpent,
  totalOrders,
}: TopCustomerListItemProps) {
  return (
    <li className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4 w-full">
        <div className="relative aspect-square rounded-full w-14 h-14">
          <Image
            src={user.photo.url}
            fill
            className="object-cover rounded-full"
            alt="User photo"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-bold truncate">{user.name}</span>
          <span className="text-sm">
            Đơn hàng:{' '}
            <span className="font-semibold text-red-500">{totalOrders}</span>
          </span>
          <span className="text-sm">
            Tổng chi:{' '}
            <span className="font-semibold">{formatMoney(totalSpent)}</span>
          </span>
        </div>
      </div>
    </li>
  );
}
