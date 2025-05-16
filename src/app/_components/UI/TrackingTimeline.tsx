'use client';

import React, { useState } from 'react';

interface StatusEntry {
  _id: string;
  status: string;
  description: string;
  timestamp: string;
}

interface TrackingTimelineProps {
  history: StatusEntry[];
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ history }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = 3;

  const visibleHistory = expanded ? history : history.slice(0, visibleCount);

  return (
    <div className="flex flex-col relative">
      {/* Vertical line */}
      <div className="absolute left-[6px] top-3 bottom-3 w-[1px] bg-gray-300 z-0" />

      {visibleHistory.map((entry) => (
        <div key={entry._id} className="flex mb-8 relative">
          {/* Left: dot */}
          <div className="relative mr-4 mt-1.5 z-10">
            <div className="w-3 h-3 bg-primary-500 rounded-full" />
          </div>

          {/* Right: content */}
          <div className="flex-1">
            <p className="font-medium text-primary-600 leading-tight">
              {entry.description}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(entry.timestamp).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}

      {history.length > visibleCount && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary-600 hover:underline self-center"
        >
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
};

export default TrackingTimeline;
