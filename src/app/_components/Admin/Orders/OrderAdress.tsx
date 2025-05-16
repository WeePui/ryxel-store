import { Address } from '@/app/_types/address';
import Card from '../../UI/Card';
import { FaRegUser } from 'react-icons/fa';

interface OrderAdressProps {
  shippingAddress: Address;
}

export default function OrderAdress({ shippingAddress }: OrderAdressProps) {
  return (
    <Card title="Địa chỉ giao hàng">
      <div className="flex items-center gap-2 mt-4 font-semibold">
        <FaRegUser />
        <span>
          {shippingAddress.fullname}{' '}
          <span className="text-sm text-gray-400 font-normal ml-4">
            ({shippingAddress.phoneNumber})
          </span>
        </span>
      </div>
      <div className="text-gray-500 text-sm mt-2 flex flex-col gap-2">
        <span>{shippingAddress.address}</span>
        <span>
          {shippingAddress.ward.name}, {shippingAddress.district.name},{' '}
          {shippingAddress.city.name}
        </span>
        <span>{shippingAddress.country}</span>
      </div>
    </Card>
  );
}
