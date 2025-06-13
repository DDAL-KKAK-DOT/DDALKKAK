import React from "react";
import Image from "next/image";

interface TemplateCardProps {
  highlighted?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  templateType: string;
  previewImage: string;
}

export default function TemplateCard({
  highlighted,
  onMouseEnter,
  onMouseLeave,
  onClick,
  templateType,
  previewImage,
}: TemplateCardProps) {
  return (
    <div
      className={`w-full aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
        highlighted ? "scale-105 shadow-xl" : "shadow-md"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Image
        src={previewImage}
        alt={`Template ${templateType} preview`}
        width={280}
        height={373}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
