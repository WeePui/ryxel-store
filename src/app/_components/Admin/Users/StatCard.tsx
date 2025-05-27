"use client";

import Card from "@/app/_components/UI/Card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  gradient: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  gradient,
}: StatCardProps) {
  return (
    <Card className={`text-white ${gradient}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white/80">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          {description && (
            <p className="text-xs text-white/70">{description}</p>
          )}
        </div>
        <div className="text-3xl text-white/80">{icon}</div>
      </div>
    </Card>
  );
}
