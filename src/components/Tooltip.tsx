// src/components/Tooltip.tsx
import React from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  return (
    <div className="relative inline-block">
      <div className="inline">{children}</div>
      <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded p-2 w-64 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800" />
      </div>
    </div>
  );
};

export default Tooltip;
