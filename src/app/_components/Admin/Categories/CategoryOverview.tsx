import BarChart from '../../UI/BarChart';
import Card from '../../UI/Card';

interface CategoryOverviewProps {
  data: { name: string; sales: number }[];
}

export default function CategoryOverview({ data }: CategoryOverviewProps) {
  return (
    <Card title="Tổng quan" className="w-full">
      {data && data.length > 0 ? (
        <BarChart data={data} keys={['sales']} />
      ) : (
        <p className="text-gray-400 font-semibold">Không có dữ liệu.</p>
      )}
    </Card>
  );
}
