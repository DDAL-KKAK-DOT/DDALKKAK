import React from "react";
import { Section, TextField } from "@/components/Field";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import IconButton from "@/components/IconButton/IconButton";
import type { AIResumeResponse } from "@/types/resume";

type SkillsSectionProps = {
  resume: AIResumeResponse;
  handleSkillChange: (idx: number, value: string) => void;
  handleAddSkill: () => void;
  handleRemoveSkill: (idx: number) => void;
  ref?: React.Ref<HTMLDivElement>;
};

function SkillsSection({
  resume,
  handleSkillChange,
  handleAddSkill,
  handleRemoveSkill,
  ref,
}: SkillsSectionProps) {
  return (
    <Section
      title="기술 스택"
      description="보유한 기술을 입력하세요."
      ref={ref}
    >
      {resume.skills.map((skill, idx) => (
        <div key={idx} className="flex gap-2">
          <TextField
            type="text"
            value={skill}
            onChange={(e) => handleSkillChange(idx, e.target.value)}
            placeholder="기술을 입력하세요"
          />
          <IconButton
            variant="secondary"
            onClick={() => handleRemoveSkill(idx)}
            startIcon={<Icon icon="Delete" size={16} />}
          />
        </div>
      ))}
      <Button variant="secondary" className="p-2" onClick={handleAddSkill}>
        기술 추가
      </Button>
    </Section>
  );
}

export default SkillsSection;
