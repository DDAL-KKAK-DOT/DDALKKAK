import React from "react";

const TABS = [
  { key: "profile", label: "프로필" },
  { key: "intro", label: "한줄소개" },
  { key: "skills", label: "기술스택" },
  { key: "projects", label: "프로젝트" },
  { key: "careers", label: "경력" },
  { key: "educations", label: "학력" },
  { key: "clubs", label: "동아리/활동" },
];

function ResumeFormTabs({
  current,
  onChange,
}: {
  current: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex gap-2 mb-3">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={
            `px-4 py-2 rounded-md border-none button-s-medium transition-colors cursor-pointer ` +
            (current === tab.key
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300")
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default ResumeFormTabs;
