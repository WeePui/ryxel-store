import React, { JSX } from 'react';

interface AssistiveTextProps {
  icon: JSX.Element;
  text: string;
  error?: boolean;
  className?: string;
}

export default function AssistiveText({
  icon,
  text,
  error,
  className,
}: AssistiveTextProps) {
  return (
    <div
      className={`flex items-center mb-2 text-xs gap-2 ${
        error ? 'text-red-500' : 'text-grey-300'
      } ${className}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
