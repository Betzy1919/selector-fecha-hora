import { useRef, useState, useEffect, useCallback } from "react";

interface WheelPickerProps {
  values: (string | number)[];
  value: string | number;
  onChange: (value: string | number) => void;
  itemHeight?: number;
  visibleCount?: number;
}

export default function WheelPicker({
  values,
  value,
  onChange,
  itemHeight = 40,
  visibleCount = 5,
}: WheelPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);
  const velocity = useRef(0);
  const lastY = useRef(0);
  const lastTime = useRef(0);
  const animationFrame = useRef<number>();

  const currentIndex = values.indexOf(value);
  const [scrollOffset, setScrollOffset] = useState(0);

  const snapToIndex = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(values.length - 1, index));
    const offset = clampedIndex * itemHeight;
    setScrollOffset(offset);
    if (values[clampedIndex] !== value) {
      onChange(values[clampedIndex]);
    }
  }, [values, itemHeight, value, onChange]);

  useEffect(() => {
    snapToIndex(currentIndex);
  }, [value, currentIndex, snapToIndex]);

  const handleMomentum = useCallback(() => {
    if (Math.abs(velocity.current) > 0.1) {
      setScrollOffset((prev) => {
        const newOffset = prev + velocity.current;
        const maxOffset = (values.length - 1) * itemHeight;
        return Math.max(0, Math.min(maxOffset, newOffset));
      });
      velocity.current *= 0.95;
      animationFrame.current = requestAnimationFrame(handleMomentum);
    } else {
      const nearestIndex = Math.round(scrollOffset / itemHeight);
      snapToIndex(nearestIndex);
    }
  }, [itemHeight, values.length, scrollOffset, snapToIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
    lastY.current = e.touches[0].clientY;
    lastTime.current = Date.now();
    startScrollTop.current = scrollOffset;
    velocity.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = startY.current - currentY;
    const now = Date.now();
    const deltaTime = now - lastTime.current;

    if (deltaTime > 0) {
      velocity.current = (lastY.current - currentY) / deltaTime * 16;
    }

    lastY.current = currentY;
    lastTime.current = now;

    const newOffset = startScrollTop.current + deltaY;
    const maxOffset = (values.length - 1) * itemHeight;
    setScrollOffset(Math.max(0, Math.min(maxOffset, newOffset)));
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (Math.abs(velocity.current) > 0.5) {
      animationFrame.current = requestAnimationFrame(handleMomentum);
    } else {
      const nearestIndex = Math.round(scrollOffset / itemHeight);
      snapToIndex(nearestIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    isDragging.current = true;
    startY.current = e.clientY;
    lastY.current = e.clientY;
    lastTime.current = Date.now();
    startScrollTop.current = scrollOffset;
    velocity.current = 0;
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;

    const currentY = e.clientY;
    const deltaY = startY.current - currentY;
    const now = Date.now();
    const deltaTime = now - lastTime.current;

    if (deltaTime > 0) {
      velocity.current = (lastY.current - currentY) / deltaTime * 16;
    }

    lastY.current = currentY;
    lastTime.current = now;

    const newOffset = startScrollTop.current + deltaY;
    const maxOffset = (values.length - 1) * itemHeight;
    setScrollOffset(Math.max(0, Math.min(maxOffset, newOffset)));
  }, [itemHeight, values.length]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(velocity.current) > 0.5) {
      animationFrame.current = requestAnimationFrame(handleMomentum);
    } else {
      const nearestIndex = Math.round(scrollOffset / itemHeight);
      snapToIndex(nearestIndex);
    }
  }, [handleMomentum, itemHeight, scrollOffset, snapToIndex]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [handleMouseMove, handleMouseUp]);

  const containerHeight = visibleCount * itemHeight;
  const paddingItems = Math.floor(visibleCount / 2);

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden"
      style={{ height: `${containerHeight}px` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />
      
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{ height: `${itemHeight}px` }}
      >
        <div className="absolute inset-0 bg-accent/30 rounded-md border border-accent-border" />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />

      <div
        className="relative"
        style={{
          transform: `translateY(${containerHeight / 2 - itemHeight / 2 - scrollOffset}px)`,
          transition: isDragging.current ? "none" : "transform 200ms ease-out",
        }}
      >
        {[...Array(paddingItems)].map((_, i) => (
          <div key={`padding-top-${i}`} style={{ height: `${itemHeight}px` }} />
        ))}
        
        {values.map((val, index) => {
          const distanceFromCenter = Math.abs(index - scrollOffset / itemHeight);
          const opacity = Math.max(0.3, 1 - distanceFromCenter * 0.35);
          const scale = Math.max(0.7, 1 - distanceFromCenter * 0.15);
          
          return (
            <div
              key={index}
              className="flex items-center justify-center font-medium transition-opacity duration-150"
              style={{
                height: `${itemHeight}px`,
                opacity,
                transform: `scale(${scale})`,
                fontSize: index === Math.round(scrollOffset / itemHeight) ? "24px" : "18px",
                fontWeight: index === Math.round(scrollOffset / itemHeight) ? 600 : 400,
              }}
              data-testid={`wheel-item-${val}`}
            >
              {val}
            </div>
          );
        })}
        
        {[...Array(paddingItems)].map((_, i) => (
          <div key={`padding-bottom-${i}`} style={{ height: `${itemHeight}px` }} />
        ))}
      </div>
    </div>
  );
}
