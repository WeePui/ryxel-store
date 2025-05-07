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
  const currentMonth = now.getMonth(); // still 0-based

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [monthOptions, setMonthOptions] = useState(() =>
    generateMonthOptions(currentYear)
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    const months = getMonthRange(currentYear);
    return months.includes(currentMonth)
      ? currentMonth + 1 // 1-based
      : months[months.length - 1] + 1;
  });

  useEffect(() => {
    const newOptions = generateMonthOptions(selectedYear);
    setMonthOptions(newOptions);

    const validMonths = newOptions.map((opt) => opt.value);

    if (!validMonths.includes(selectedMonth)) {
      const fallbackMonth = validMonths[validMonths.length - 1];
      setSelectedMonth(fallbackMonth);
      onSelect(`year=${selectedYear}&month=${fallbackMonth}`);
    } else {
      onSelect(`year=${selectedYear}&month=${selectedMonth}`);
    }
  }, [selectedYear, onSelect, selectedMonth]);

  useEffect(() => {
    onSelect(`year=${currentYear}&month=${currentMonth + 1}`);
  }, [currentYear, currentMonth, onSelect]);

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
            setSelectedMonth(Number(e.target.value)); // no adjustment here (already 1-based)
          }}
          value={selectedMonth}
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
      />
    </div>
  );
}
