'use client';

import { getMonthRange, getYearRange } from '@/app/_utils/adminTimeRange';
import { useEffect, useState } from 'react';
import Input from './Input';

interface AdminDateSelectorProps {
  range: string;
  onSelect: (value: string) => void;
}

const yearOptions = getYearRange().map((year) => ({
  label: year.toString(),
  value: year,
}));

const generateMonthOptions = (year: number) => {
  return getMonthRange(year).map((month) => {
    const monthDate = new Date(year, month);
    const monthName = monthDate.toLocaleString('vi-VN', { month: 'long' });

    return { label: monthName, value: month + 1 }; // 1-based
  });
};

export default function AdminDateSelector({
  range,
  onSelect,
}: AdminDateSelectorProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [monthOptions, setMonthOptions] = useState(() =>
    generateMonthOptions(currentYear)
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    const months = getMonthRange(currentYear);
    return months.includes(currentMonth)
      ? currentMonth + 1
      : months[months.length - 1] + 1;
  });

  useEffect(() => {
    const newOptions = generateMonthOptions(selectedYear);
    setMonthOptions(newOptions);

    const validMonths = newOptions.map((opt) => opt.value);
    let finalMonth = selectedMonth;

    if (!validMonths.includes(selectedMonth)) {
      finalMonth = validMonths[validMonths.length - 1];
      setSelectedMonth(finalMonth);
    }

    onSelect(`year=${selectedYear}&month=${finalMonth}`);
  }, [selectedYear, selectedMonth, onSelect]);

  return (
    <div className="flex items-center gap-4">
      {range === 'month' && (
        <Input
          label="Tháng"
          type="select"
          options={monthOptions}
          name="month"
          id="month"
          onChange={(e) => {
            setSelectedMonth(Number(e.target.value));
          }}
          value={selectedMonth}
          variant="small"
        />
      )}
      <Input
        label="Năm"
        type="select"
        options={yearOptions}
        name="year"
        id="year"
        onChange={(e) => {
          setSelectedYear(Number(e.target.value));
        }}
        value={selectedYear}
        variant="small"
      />
    </div>
  );
}
