'use client';

import { useEffect, useState } from 'react';
import Card from '../../UI/Card';
import TabSelector from '../../UI/TabSelector';
import TopCustomerList from './TopCustomerList';
import { User } from '@/app/_types/user';
import AdminDateSelector from '../../UI/AdminDateSelector';
import Loader from '../../UI/Loader';

// const data = [
//   {
//     user: {
//       _id: '1',
//       name: 'Jack',
//       photo: {
//         url: '/test-images/jack.jpg',
//       },
//     } as User,
//     totalSpent: 100,
//     totalOrders: 5,
//   },
//   {
//     user: {
//       _id: '2',
//       name: 'J97',
//       photo: {
//         url: '/test-images/j97.jpg',
//       },
//     } as User,
//     totalSpent: 150,
//     totalOrders: 3,
//   },
//   {
//     user: {
//       _id: '3',
//       name: 'Trịnh Trần Phương Tuấn',
//       photo: {
//         url: '/test-images/trinh-tran-phuong-tuan.jpg',
//       },
//     } as User,
//     totalSpent: 200,
//     totalOrders: 8,
//   },
//   {
//     user: {
//       _id: '4',
//       name: 'Meo-meo',
//       photo: {
//         url: '/test-images/meo-meo.jpg',
//       },
//     } as User,
//     totalSpent: 250,
//     totalOrders: 10,
//   },
//   {
//     user: {
//       _id: '5',
//       name: 'Joker Bến Tre',
//       photo: {
//         url: '/test-images/joker-ben-tre.jpg',
//       },
//     } as User,
//     totalSpent: 300,
//     totalOrders: 12,
//   },
// ];

export default function TopCustomers({ cookies }: { cookies: string }) {
  const [range, setRange] = useState('month');
  const [timeRange, setTimeRange] = useState('');
  const [data, setData] = useState<
    Array<{ user: User; totalSpent: number; totalOrders: number }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dashboard/top-customers?${timeRange}&range=${range}`,
        {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies}`,
          },
        }
      );

      if (!response.ok) {
        setData([]);
        setLoading(false);
        return;
      }

      const { data } = await response.json();
      const { users } = data;
      setData(users);
      setLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, timeRange]);

  return (
    <Card
      title="Top 5 người tui luôn tin tưởng"
      className="flex flex-col gap-6 flex-grow pb-10"
      titleAction={
        <div className="flex items-center gap-4">
          <AdminDateSelector range={range} onSelect={setTimeRange} />
          <TabSelector
            tabLabels={['Theo tháng', 'Theo năm']}
            tabValues={['month', 'year']}
            selectedTab={range}
            onTabSelect={setRange}
          />
        </div>
      }
    >
      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <div className="text-center font-medium text-grey-300">
          Không có dữ liệu
        </div>
      ) : (
        <TopCustomerList topCustomers={data} />
      )}
    </Card>
  );
}
