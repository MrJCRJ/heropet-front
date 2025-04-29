// File: src/pages/Home/StockTooltip.tsx
import React, { useEffect, useRef } from "react";

interface TooltipPosition {
  x: number;
  y: number;
}

interface TooltipContent {
  title: string;
  items: {
    label: string;
    value: string;
    color?: string;
  }[];
}

interface StockTooltipProps {
  visible: boolean;
  position: TooltipPosition;
  content: TooltipContent;
  offset?: { x: number; y: number };
  maxWidth?: number;
}

const StockTooltip: React.FC<StockTooltipProps> = ({
  visible,
  position,
  content,
  offset = { x: 10, y: 10 },
  maxWidth = 280,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && tooltipRef.current) {
      const { width, height } = tooltipRef.current.getBoundingClientRect();
      const adjustedX = Math.min(
        position.x + offset.x,
        window.innerWidth - width - 5
      );
      const adjustedY = Math.min(
        position.y + offset.y,
        window.innerHeight - height - 5
      );

      tooltipRef.current.style.left = `${adjustedX}px`;
      tooltipRef.current.style.top = `${adjustedY}px`;
    }
  }, [visible, position, offset]);

  if (!visible) return null;

  return (
    <div
      ref={tooltipRef}
      className="fixed bg-gray-800 text-white p-3 rounded-md text-sm z-50 pointer-events-none shadow-xl"
      style={{ maxWidth: `${maxWidth}px` }}
      role="tooltip"
    >
      <h3 className="font-bold border-b border-gray-600 pb-1 mb-2">
        {content.title}
      </h3>
      <div className="space-y-1">
        {content.items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-300">{item.label}</span>
            <span className={item.color || "text-white"}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTooltip;
