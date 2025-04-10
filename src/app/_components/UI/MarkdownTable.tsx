import React from 'react';

export default function MarkdownTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-300 text-sm text-left ">
        {children}
      </table>
    </div>
  );
}
