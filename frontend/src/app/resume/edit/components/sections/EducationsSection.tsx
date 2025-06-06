import React from "react";
import { Section, TextareaField, TextField } from "@/components/Field";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import IconButton from "@/components/IconButton/IconButton";
import type { AIResumeResponse } from "@/types/resume";

type EducationsSectionProps = {
  resume: AIResumeResponse;
  handleEducationChange: (idx: number, field: string, value: string) => void;
  handleAddEducation: () => void;
  handleRemoveEducation: (idx: number) => void;
  ref?: React.Ref<HTMLDivElement>;
};

function EducationsSection({
  resume,
  handleEducationChange,
  handleAddEducation,
  handleRemoveEducation,
  ref,
}: EducationsSectionProps) {
  return (
    <Section title="학력" description="학력 사항을 입력하세요." ref={ref}>
      <div className="space-y-6">
        {resume.educations.map((education, idx) => (
          <div
            key={idx}
            className="space-y-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex justify-between items-center gap-4">
              <TextField
                type="text"
                value={education.name}
                onChange={(e) =>
                  handleEducationChange(idx, "name", e.target.value)
                }
                placeholder="학교명"
              />
              <IconButton
                variant="secondary"
                onClick={() => handleRemoveEducation(idx)}
                startIcon={<Icon icon="Delete" size={16} />}
              />
            </div>
            <TextField
              type="text"
              value={education.period}
              onChange={(e) =>
                handleEducationChange(idx, "period", e.target.value)
              }
              placeholder="기간 (예: 2019.03 - 2023.02)"
            />
            <TextareaField
              id="description"
              value={education.description}
              onChange={(e) =>
                handleEducationChange(idx, "description", e.target.value)
              }
              placeholder="전공, 학점, 주요 활동 등"
            />
          </div>
        ))}
        <Button
          variant="secondary"
          className="p-2"
          onClick={handleAddEducation}
        >
          학력 추가
        </Button>
      </div>
    </Section>
  );
}

export default EducationsSection;
