import { Category } from '@/app/_types/category';
import { formatMoneyCompact } from '@/app/_utils/formatMoney';
import Image from 'next/image';

interface CategoryStatProps {
  category: Category & { revenue: number; changeRate: number };
}

export default function CategoryStat({ category }: CategoryStatProps) {
  const isPositive = category.changeRate > 0;
  const changeRateClass = isPositive ? 'text-green-500' : 'text-red-500';
  const changeRateIcon = isPositive ? '↑' : '↓';
  const formattedChangeRate = `${(category.changeRate * 100).toFixed(2)}`;

  return (
    <div className="flex items-center gap-4 sm:pt-2">
      <div className="relative aspect-square w-20 flex-shrink-0">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">{category.name}</span>
        <p className="text-xs">
          Doanh thu:{' '}
          <span className="text-lg font-bold md:block truncate">
            {formatMoneyCompact(category.revenue)}
          </span>
        </p>
        <div
          className={`text-[10px] font-semibold ${changeRateClass} ${
            isPositive ? 'bg-green-100' : 'bg-red-100'
          } rounded-full px-2 py-1 flex items-center gap-1 w-fit`}
        >
          <span>
            {isPositive ? '+' : '-'}
            {formattedChangeRate}% {changeRateIcon}
          </span>
        </div>
      </div>
    </div>
  );
}
