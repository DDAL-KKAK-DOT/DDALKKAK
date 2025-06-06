import React from "react";
import { Section, TextareaField } from "@/components/Field";
import type { AIResumeResponse } from "@/types/resume";

type IntroSectionProps = {
  resume: AIResumeResponse;
  handleIntroChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
};

function IntroSection({ resume, handleIntroChange, ref }: IntroSectionProps) {
  return (
    <Section
      title="한줄 소개"
      description="자신을 한 줄로 소개해보세요."
      ref={ref}
    >
      <TextareaField
        id="shortIntro"
        value={resume.shortIntro}
        onChange={handleIntroChange}
        placeholder="자신을 한 줄로 소개해보세요"
      />
    </Section>
  );
}

export default IntroSection;
