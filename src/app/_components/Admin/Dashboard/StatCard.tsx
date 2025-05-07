'use client';

import { getTintedColor } from '@/app/_helpers/getTintedColor';
import { motion } from 'framer-motion';
import Card from '../../UI/Card';
import Tooltip from '../../UI/Tooltip';

interface StatCardProps {
  icon?: React.ReactNode;
  iconColor?: string;
  title: string;
  value: string;
  changeRate?: number;
}

export default function StatCard({
  icon = null,
  iconColor = '#000',
  title,
  value,
  changeRate = 0,
}: StatCardProps) {
  const isPositive = changeRate > 0;
  const changeRateClass = isPositive ? 'text-green-500' : 'text-red-500';
  const changeRateIcon = isPositive ? '↑' : '↓';
  const formattedChangeRate = `${(changeRate * 100).toFixed(2)}`;
  const tintedBackground = getTintedColor(iconColor);

  return (
    <Card className="flex flex-col gap-6 mb-4 flex-1 basis-0 min-w-[200px]">
      <span className="text-grey-300 font-bold text-sm">{title}</span>
      <span className="font-bold text-3xl">{value}</span>
      <div className="flex items-center justify-between">
        <div
          className={`text-[10px] font-semibold ${changeRateClass} ${
            isPositive ? 'bg-green-100' : 'bg-red-100'
          } rounded-full px-2 py-1 flex items-center gap-1 w-fit`}
        >
          {isPositive ? '+' : '-'}
          {formattedChangeRate}% {changeRateIcon}
        </div>
        <Tooltip
          button={
            <button className="text-primary-400 underline text-xs hover:text-primary-500 font-semibold">
              Xem chi tiết
            </button>
          }
          text="Chỉ số này phản ánh sự thay đổi so với tháng trước"
        />
      </div>
      <div
        className={`absolute right-6 text-2xl aspect-square p-2 rounded-lg flex items-center justify-center`}
        style={{ color: iconColor, backgroundColor: tintedBackground }}
      >
        {icon}
      </div>
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-11/12 bg-primary-300 bg-gradient-to-r h-full -z-10 rounded-xl"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      ></motion.div>
    </Card>
  );
}
