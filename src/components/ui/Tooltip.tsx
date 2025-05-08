// src/components/ui/Tooltip.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  disabled?: boolean;
  className?: string;
  tooltipClassName?: string;
}

const Tooltip = ({
  content,
  children,
  position = "top",
  delay = 300,
  disabled = false,
  className = "",
  tooltipClassName = "",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipId = useRef(
    `tooltip-${Math.random().toString(36).substr(2, 9)}`
  );

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    const positions = {
      top: {
        top: triggerRect.top + scrollY - tooltipRect.height - 8,
        left:
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          tooltipRect.width / 2,
      },
      bottom: {
        top: triggerRect.bottom + scrollY + 8,
        left:
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          tooltipRect.width / 2,
      },
      left: {
        top:
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          tooltipRect.height / 2,
        left: triggerRect.left + scrollX - tooltipRect.width - 8,
      },
      right: {
        top:
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          tooltipRect.height / 2,
        left: triggerRect.right + scrollX + 8,
      },
    };

    // Ajuste para não sair da tela
    const adjustedPosition = { ...positions[position] };
    adjustedPosition.left = Math.max(
      8,
      Math.min(adjustedPosition.left, window.innerWidth - tooltipRect.width - 8)
    );
    adjustedPosition.top = Math.max(
      8,
      Math.min(
        adjustedPosition.top,
        window.innerHeight - tooltipRect.height - 8
      )
    );

    setCoords(adjustedPosition);
  }, [position]);

  const showTooltip = useCallback(() => {
    setIsVisible(true);
    updatePosition();
  }, [updatePosition]);

  const hideTooltip = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    timeoutRef.current = setTimeout(showTooltip, delay);
  }, [delay, disabled, showTooltip]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timeoutRef.current!);
    hideTooltip();
  }, [hideTooltip]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      clearTimeout(timeoutRef.current!);
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      const handleScroll = () => updatePosition();
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

  if (!isMounted) return null;

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-gray-800",
    left: "left-full top-1/2 -translate-y-1/2 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-800",
    right:
      "right-full top-1/2 -translate-y-1/2 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-gray-800",
  };

  const triggerElement = React.cloneElement(children, {
    "aria-describedby": tooltipId.current,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {triggerElement}

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId.current}
            className={`fixed z-50 bg-gray-800 text-white text-sm rounded-md p-3 max-w-xs shadow-lg transition-opacity ${positionClasses[position]} ${tooltipClassName}`}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            role="tooltip"
          >
            {content}
            <div className={`absolute ${arrowClasses[position]}`} />
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
