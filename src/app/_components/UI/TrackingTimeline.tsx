"use client";

import React, { useState } from "react";
import { useSafeTranslation } from "@/app/_hooks/useSafeTranslation";

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
  const t = useSafeTranslation();
  const visibleCount = 3;

  const visibleHistory = expanded ? history : history.slice(0, visibleCount);

  return (
    <div className="relative flex flex-col">
      {/* Vertical line */}
      <div className="absolute bottom-3 left-[6px] top-3 z-0 w-[1px] bg-gray-300" />

      {visibleHistory.map((entry) => (
        <div key={entry._id} className="relative mb-8 flex">
          {/* Left: dot */}
          <div className="relative z-10 mr-4 mt-1.5">
            <div className="h-3 w-3 rounded-full bg-primary-500" />
          </div>

          {/* Right: content */}
          <div className="flex-1">
            <p className="font-medium leading-tight text-primary-600">
              {entry.description}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(entry.timestamp).toLocaleString(
                t("language") === "vi" ? "vi-VN" : "en-US",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
            </p>
          </div>
        </div>
      ))}

      {history.length > visibleCount && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="self-center text-sm text-primary-600 hover:underline"
        >
          {expanded
            ? t("timelineTracking.collapse")
            : t("timelineTracking.showMore")}
        </button>
      )}
    </div>
  );
};

export default TrackingTimeline;
