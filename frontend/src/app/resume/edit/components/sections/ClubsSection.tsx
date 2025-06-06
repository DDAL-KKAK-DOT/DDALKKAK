import React from "react";
import { Section, TextareaField, TextField } from "@/components/Field";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import IconButton from "@/components/IconButton/IconButton";
import type { AIResumeResponse } from "@/types/resume";

type ClubsSectionProps = {
  resume: AIResumeResponse;
  handleClubChange: (idx: number, field: string, value: string) => void;
  handleAddClub: () => void;
  handleRemoveClub: (idx: number) => void;
  ref?: React.Ref<HTMLDivElement>;
};

function ClubsSection({
  resume,
  handleClubChange,
  handleAddClub,
  handleRemoveClub,
  ref,
}: ClubsSectionProps) {
  return (
    <Section
      title="동아리/활동"
      description="동아리 및 활동 사항을 입력하세요."
      ref={ref}
    >
      <div className="space-y-6">
        {resume.clubs.map((club, idx) => (
          <div
            key={idx}
            className="space-y-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex justify-between items-center gap-4">
              <TextField
                type="text"
                value={club.name}
                onChange={(e) => handleClubChange(idx, "name", e.target.value)}
                placeholder="동아리/활동명"
              />
              <IconButton
                variant="secondary"
                onClick={() => handleRemoveClub(idx)}
                startIcon={<Icon icon="Delete" size={16} />}
              />
            </div>
            <TextField
              type="text"
              value={club.period}
              onChange={(e) => handleClubChange(idx, "period", e.target.value)}
              placeholder="기간 (예: 2022.03 - 2023.02)"
            />
            <TextareaField
              id="description"
              value={club.description}
              onChange={(e) =>
                handleClubChange(idx, "description", e.target.value)
              }
              placeholder="역할 및 주요 활동"
            />
          </div>
        ))}
        <Button variant="secondary" className="p-2" onClick={handleAddClub}>
          동아리/활동 추가
        </Button>
      </div>
    </Section>
  );
}

export default ClubsSection;
