"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Button from "@/components/Button/Button";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview/ResumePreview";
import ResumeTypeSelector from "./components/ResumeTypeSelector";

import { useResume } from "@/hooks/useResume";
import { useResumeUpload } from "@/hooks/queries/useResumeUpload";
import useResizableForm from "@/components/ResizerBar/useResizableForm";
import ResizerBar from "@/components/ResizerBar/ResizerBar";

const A4_WIDTH = 595; // px
const FORM_MIN_WIDTH = 250;
const FORM_MAX_WIDTH = 900;
const DEFAULT_FORM_WIDTH = 700;
const MARGIN = 64; // 좌우 여백

export default function EditPage() {
  const [scale, setScale] = useState(1);
  const { formWidth, handleDrag } = useResizableForm(
    FORM_MIN_WIDTH,
    FORM_MAX_WIDTH,
    DEFAULT_FORM_WIDTH,
  );
  const { resume, setResume } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "type1";

  const { uploadResume, isUploading } = useResumeUpload({
    onError: (error) => {
      console.error("PDF 변환 실패:", error);
      alert((error?.message || "") + " 다시 시도해주세요.");
    },
  });

  const handleDownloadPdf = () => {
    if (resumeRef.current) {
      uploadResume(resumeRef.current);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = Math.max(
        window.innerWidth - formWidth - MARGIN * 2,
        320,
      );
      const ratio = Math.min(1, availableWidth / A4_WIDTH);
      setScale(Math.max(ratio, 0.3)); // 최소 배율 0.3
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [formWidth]);

  return (
    <DefaultLayout>
      <div className="flex h-screen min-h-screen bg-gray-200">
        {/* 입력 폼 */}
        <div
          className="h-screen overflow-y-auto bg-gray-100 box-border"
          style={{
            width: formWidth,
            minWidth: FORM_MIN_WIDTH,
            maxWidth: FORM_MAX_WIDTH,
          }}
        >
          <ResumeForm resume={resume} setResume={setResume} />
        </div>

        {/* 리사이저 바 */}
        <ResizerBar onDrag={handleDrag} />

        <div className="flex-1 justify-center items-start overflow-y-auto hidden lg:flex p-4 xl:p-8 relative">
          {/* 타입 선택 및 다운로드 버튼 */}
          <div className="sticky w-full top-0 right-0 flex items-center justify-between gap-4 z-10 py-2 px-4 rounded-lg">
            <ResumeTypeSelector templateType={template} />
            <Button
              onClick={handleDownloadPdf}
              disabled={isUploading}
              variant="primary"
              className="py-3 px-4"
            >
              {isUploading ? "PDF 변환 중..." : "PDF 다운로드"}
            </Button>
          </div>

          {/* 프리뷰 */}
          <div className="absolute top-24 left-0 right-0 flex flex-col items-center">
            <div
              style={{
                transform: `scale(${Math.min(Math.max(scale, 0.5), 1.3)})`,
                transformOrigin: "top left",
                width: `${A4_WIDTH * Math.min(Math.max(scale, 0.5), 1.3)}px`,
              }}
            >
              <div
                ref={resumeRef}
                className="w-[595px] min-h-[842px] bg-white shadow-xl overflow-hidden mb-15"
                style={{ height: "fit-content" }}
              >
                <ResumePreview resume={resume} theme={template} />
              </div>
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
