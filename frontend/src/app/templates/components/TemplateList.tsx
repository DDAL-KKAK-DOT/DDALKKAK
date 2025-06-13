"use client";
import { useState } from "react";
import TemplateCard from "./TemplateCard";
import { RESUME_TEMPLATES } from "./themes";
import { useRouter } from "next/navigation";

export default function TemplateList() {
  const [hovered, setHovered] = useState<number | null>(null);
  const router = useRouter();

  const handleTemplateClick = (templateType: string) => {
    router.push(`/resume/start?template=${templateType}`);
  };

  return (
    <div className="container mx-auto px-4 max-w-[1300px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-20 justify-items-center">
        {RESUME_TEMPLATES.map((tpl, idx) => (
          <div
            key={tpl.id}
            className="w-full max-w-[280px] flex flex-col items-center group"
          >
            <div className="flex flex-col items-center w-full">
              <TemplateCard
                highlighted={hovered === idx}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleTemplateClick(tpl.templateType)}
                templateType={tpl.templateType}
                previewImage={tpl.previewImage}
              />
              <div className="mt-10 w-full text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {tpl.name}
                </div>
                <div className="text-lg text-gray-500 mt-1">
                  {tpl.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
