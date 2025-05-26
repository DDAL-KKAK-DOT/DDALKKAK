import Button from "@/components/Button/Button";
import { cn } from "@/lib/cn";
import React from "react";

interface TemplateCardProps {
  highlighted?: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function TemplateCard({
  highlighted = false,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
}: TemplateCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-xl flex flex-col items-center justify-between p-8 transition-all duration-300 cursor-pointer shadow-lg relative aspect-[4/5] transform",
        highlighted
          ? "bg-gray-100 shadow-xl scale-105"
          : "bg-gray-200 opacity-80 hover:bg-gray-100 hover:opacity-100 hover:shadow-xl hover:scale-105",
        className,
      )}
      style={{ transformOrigin: "center bottom" }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex-1" />
      <Button
        variant="outline"
        size="md"
        fullWidth
        className={cn(
          "transition-opacity",
          highlighted ? "opacity-100" : "opacity-0 hover:opacity-100",
        )}
      >
        이 템플릿으로 진행하기
      </Button>
    </div>
  );
}
