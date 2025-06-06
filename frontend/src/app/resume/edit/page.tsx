"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import ResumePreview from "./components/ResumePreview";
import ResumeForm from "./components/ResumeForm";
import { useResume } from "@/hooks/useResume";

const A4_WIDTH = 595; // px
const FORM_WIDTH = 600; // px
const MARGIN = 64; // 좌우 여백

export default function EditPage() {
  const [scale, setScale] = useState(1);
  const { resume, setResume } = useResume();

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = Math.max(
        window.innerWidth - FORM_WIDTH - MARGIN * 2,
        320,
      );
      const ratio = Math.min(1, availableWidth / A4_WIDTH);
      setScale(Math.max(ratio, 0.3)); // 최소 배율 0.3
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DefaultLayout>
      <div className="flex h-screen min-h-screen bg-gray-200">
        {/* 입력 폼 */}
        <div className="w-[700px] max-w-full p-8 h-screen overflow-y-auto bg-gray-100 box-border">
          <ResumeForm resume={resume} setResume={setResume} />
        </div>

        {/* 프리뷰 */}
        <div className="flex-1 justify-center items-start overflow-y-auto hidden lg:flex p-8">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: `${A4_WIDTH * scale}px`,
            }}
          >
            <div
              className="w-[595px] min-h-[842px] bg-white shadow-xl overflow-hidden"
              style={{ height: "fit-content" }}
            >
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>

        {/* 모바일에서는 프리뷰 숨김 */}
        <style jsx global>{`
          @media (max-width: 900px) {
            .resume-preview-wrap {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </DefaultLayout>
  );
}
