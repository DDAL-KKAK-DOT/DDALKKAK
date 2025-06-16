import React from "react";
import { Section, TextareaField, TextField } from "@/components/Field";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import IconButton from "@/components/IconButton/IconButton";
import type { AIResumeResponse } from "@/types/resume";

type CareersSectionProps = {
  resume: AIResumeResponse;
  handleCareerChange: (idx: number, field: string, value: string) => void;
  handleAddCareer: () => void;
  handleRemoveCareer: (idx: number) => void;
  ref?: React.Ref<HTMLDivElement>;
};

function CareersSection({
  resume,
  handleCareerChange,
  handleAddCareer,
  handleRemoveCareer,
  ref,
}: CareersSectionProps) {
  return (
    <Section title="경력" description="경력 사항을 입력하세요." ref={ref}>
      <div className="space-y-6">
        {resume.careers.map((career, idx) => (
          <div
            key={idx}
            className="space-y-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex justify-between items-center gap-4">
              <div className="grid grid-cols-2 gap-4 flex-1">
                <TextField
                  type="text"
                  value={career.role}
                  onChange={(e) =>
                    handleCareerChange(idx, "role", e.target.value)
                  }
                  placeholder="직무"
                />
                <TextField
                  type="text"
                  value={career.company}
                  onChange={(e) =>
                    handleCareerChange(idx, "company", e.target.value)
                  }
                  placeholder="회사명"
                />
              </div>
              <IconButton
                variant="secondary"
                onClick={() => handleRemoveCareer(idx)}
                startIcon={<Icon icon="Delete" size={16} />}
              />
            </div>
            <TextField
              type="text"
              value={career.period}
              onChange={(e) =>
                handleCareerChange(idx, "period", e.target.value)
              }
              placeholder="기간 (예: 2023.01 - 2023.12)"
            />
            <TextareaField
              id={`career-description-${idx}`}
              value={career.description}
              onChange={(e) =>
                handleCareerChange(idx, "description", e.target.value)
              }
              placeholder="주요 업무 및 성과"
            />
          </div>
        ))}
        <Button variant="secondary" className="p-2" onClick={handleAddCareer}>
          경력 추가
        </Button>
      </div>
    </Section>
  );
}

export default CareersSection;
