'use client';

import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

interface TabSelectorProps {
  tabLabels: string[]; // Array of tab labels to display
  tabValues: string[]; // Array of tab names
  selectedTab: string; // Currently selected tab
  onTabSelect: (tab: string) => void; // Function to call when a tab is selected
  className?: string; // Optional className for styling
}

export default function TabSelector({
  tabValues,
  tabLabels,
  selectedTab,
  onTabSelect,
  className,
}: TabSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={`${className} relative flex items-center`}>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        <FaEllipsisV />
      </button>
      {showDropdown && (
        <div className="absolute right-0 top-full bg-white shadow-lg rounded-md mt-2 p-2 z-10 w-fit">
          {tabValues.map((tab, index) => (
            <button
              key={tab}
              className={`block truncate w-full text-left px-4 py-2 rounded-lg hover:bg-gray-200 ${
                selectedTab === tab ? 'bg-primary-100' : ''
              }`}
              onClick={() => {
                onTabSelect(tab);
                setShowDropdown(false);
              }}
            >
              {tabLabels[index]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
