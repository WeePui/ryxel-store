import { getTintedColor } from '@/app/_helpers/getTintedColor';
import { JSX } from 'react';

interface OrderStatProps {
  title: string;
  value: number;
  changeRate?: number;
  icon?: JSX.Element;
  iconColor: string;
}

export default function OrderStat({
  value,
  changeRate = 0,
  title,
  icon,
  iconColor,
}: OrderStatProps) {
  const isPositive = changeRate > 0;
  const changeRateClass = isPositive ? 'text-green-500' : 'text-red-500';
  const changeRateIcon = isPositive ? '↑' : '↓';
  const formattedChangeRate = `${(changeRate * 100).toFixed(2)}`;

  return (
    <div className="flex items-center gap-4 sm:pt-2 w-60">
      <div
        className="w-16 h-16 rounded flex items-center justify-center text-3xl"
        style={{ background: getTintedColor(iconColor), color: iconColor }}
      >
        <span style={{ color: iconColor }}></span>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-grey-200 text-sm">{title}</span>
        <p className="text-xl font-title font-bold md:block truncate">
          {value}
        </p>
        {changeRate !== 0 && (
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
        )}
      </div>
    </div>
  );
}
