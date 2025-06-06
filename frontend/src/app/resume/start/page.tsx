"use client";

import DefaultLayout from "@/components/layout/DefaultLayout";
import ResumeForm from "./components/ResumeForm";

export default function StartPage() {
  return (
    <DefaultLayout>
      <div className="w-full py-8 flex flex-col items-center justify-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight font-bold text-center mb-8">
          AI 생성을 위한 기본 정보를 입력하세요
        </h2>
        <ResumeForm />
      </div>
    </DefaultLayout>
  );
}
