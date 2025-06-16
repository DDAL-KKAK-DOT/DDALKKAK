import React, { useRef, useEffect } from "react";

interface ResizerBarProps {
  onDrag: (x: number) => void;
}

function ResizerBar({ onDrag }: ResizerBarProps) {
  const dragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      onDrag(e.clientX);
    };
    const handleMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onDrag]);

  const handleMouseDown = () => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
  };

  return (
    <div
      className="w-2 cursor-col-resize bg-gray-300 hover:bg-blue-400 transition duration-150 select-none"
      onMouseDown={handleMouseDown}
      style={{ zIndex: 20 }}
    />
  );
}

export default ResizerBar;
