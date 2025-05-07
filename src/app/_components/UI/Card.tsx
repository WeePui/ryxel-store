import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  titleAction?: React.ReactNode;
}

export default function Card({
  children,
  className,
  title,
  titleAction,
}: CardProps) {
  return (
    <div className={`bg-white shadow-md rounded-xl ${className} relative p-6`}>
      {title && (
        <>
          <div className="flex items-center justify-between mb-2 flex-wrap gap-4 col-span-full">
            {title && <h2 className="text-lg font-bold">{title}</h2>}
            {titleAction}
          </div>
          <hr className="mb-2 col-span-full" />
        </>
      )}
      {children}
    </div>
  );
}
