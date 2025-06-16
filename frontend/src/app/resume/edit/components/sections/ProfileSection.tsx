import React from "react";
import { Section, FieldSet, TextField } from "@/components/Field";
import type { AIResumeResponse } from "@/types/resume";

type ProfileSectionProps = {
  resume: AIResumeResponse;
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
};

function ProfileSection({
  resume,
  handleProfileChange,
  ref,
}: ProfileSectionProps) {
  return (
    <Section title="프로필" description="기본 정보를 입력하세요." ref={ref}>
      <FieldSet legend="이름">
        <TextField
          name="name"
          type="text"
          value={resume.profileInfo.name}
          onChange={handleProfileChange}
          placeholder="이름을 입력하세요"
        />
      </FieldSet>
      <FieldSet legend="영문 이름">
        <TextField
          name="english_name"
          type="text"
          value={resume.profileInfo.english_name}
          onChange={handleProfileChange}
          placeholder="영문 이름을 입력하세요"
        />
      </FieldSet>
      <FieldSet legend="연락처">
        <TextField
          name="contact"
          type="text"
          value={resume.profileInfo.contact}
          onChange={handleProfileChange}
          placeholder="연락처를 입력하세요"
        />
      </FieldSet>
      <FieldSet legend="희망 직무">
        <TextField
          name="desired_role"
          type="text"
          value={resume.profileInfo.desired_role}
          onChange={handleProfileChange}
          placeholder="희망 직무를 입력하세요"
        />
      </FieldSet>
    </Section>
  );
}

export default ProfileSection;
