import { useRef, useState } from "react";
import ResumeFormTabs from "./ResumeFormTabs";
import type { AIResumeResponse } from "@/types/resume";
import {
  CareersSection,
  ClubsSection,
  EducationsSection,
  IntroSection,
  ProfileSection,
  ProjectsSection,
  SkillsSection,
} from "./sections";

const SECTION_KEYS = [
  "profile",
  "intro",
  "skills",
  "projects",
  "careers",
  "educations",
  "clubs",
] as const;

interface ResumeFormProps {
  resume: AIResumeResponse;
  setResume: (
    updater: AIResumeResponse | ((prev: AIResumeResponse) => AIResumeResponse),
  ) => void;
}

export default function ResumeForm({ resume, setResume }: ResumeFormProps) {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [currentTab, setCurrentTab] = useState<(typeof SECTION_KEYS)[number]>(
    SECTION_KEYS[0],
  );

  // 탭 클릭 시 해당 섹션으로 스크롤
  const handleTabChange = (key: string) => {
    setCurrentTab(key as (typeof SECTION_KEYS)[number]);
    const ref = sectionRefs.current[key];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 프로필 필드 변경 핸들러
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResume((prev) => ({
      ...prev,
      profileInfo: { ...prev.profileInfo, [name]: value },
    }));
  };

  // 한줄소개 변경
  const handleIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResume((prev) => ({ ...prev, shortIntro: e.target.value }));
  };

  // 기술스택 추가/삭제
  const handleAddSkill = () => {
    setResume((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };
  const handleSkillChange = (idx: number, value: string) => {
    setResume((prev) => {
      const next = [...prev.skills];
      next[idx] = value;
      return { ...prev, skills: next };
    });
  };
  const handleRemoveSkill = (idx: number) => {
    setResume((prev) => {
      const next = prev.skills.filter((_, i) => i !== idx);
      return { ...prev, skills: next };
    });
  };

  // 프로젝트 추가/수정/삭제
  const handleAddProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: "", period: "", role: "", description: "", honor: "" },
      ],
    }));
  };
  const handleProjectChange = (idx: number, field: string, value: string) => {
    setResume((prev) => {
      const next = [...prev.projects];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, projects: next };
    });
  };
  const handleRemoveProject = (idx: number) => {
    setResume((prev) => {
      const next = prev.projects.filter((_, i) => i !== idx);
      return { ...prev, projects: next };
    });
  };

  // 경력 추가/수정/삭제
  const handleAddCareer = () => {
    setResume((prev) => ({
      ...prev,
      careers: [
        ...prev.careers,
        { role: "", company: "", period: "", description: "" },
      ],
    }));
  };
  const handleCareerChange = (idx: number, field: string, value: string) => {
    setResume((prev) => {
      const next = [...prev.careers];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, careers: next };
    });
  };
  const handleRemoveCareer = (idx: number) => {
    setResume((prev) => {
      const next = prev.careers.filter((_, i) => i !== idx);
      return { ...prev, careers: next };
    });
  };

  // 학력 추가/수정/삭제
  const handleAddEducation = () => {
    setResume((prev) => ({
      ...prev,
      educations: [
        ...prev.educations,
        { name: "", period: "", description: "" },
      ],
    }));
  };
  const handleEducationChange = (idx: number, field: string, value: string) => {
    setResume((prev) => {
      const next = [...prev.educations];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, educations: next };
    });
  };
  const handleRemoveEducation = (idx: number) => {
    setResume((prev) => {
      const next = prev.educations.filter((_, i) => i !== idx);
      return { ...prev, educations: next };
    });
  };

  // 동아리/활동 추가/수정/삭제
  const handleAddClub = () => {
    setResume((prev) => ({
      ...prev,
      clubs: [...prev.clubs, { name: "", period: "", description: "" }],
    }));
  };
  const handleClubChange = (idx: number, field: string, value: string) => {
    setResume((prev) => {
      const next = [...prev.clubs];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, clubs: next };
    });
  };
  const handleRemoveClub = (idx: number) => {
    setResume((prev) => {
      const next = prev.clubs.filter((_, i) => i !== idx);
      return { ...prev, clubs: next };
    });
  };

  return (
    <div className="w-full p-5">
      <ResumeFormTabs current={currentTab} onChange={handleTabChange} />
      <div className="space-y-8">
        <ProfileSection
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current["profile"] = el;
          }}
          resume={resume}
          handleProfileChange={handleProfileChange}
        />
        <IntroSection
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current["intro"] = el;
          }}
          resume={resume}
          handleIntroChange={handleIntroChange}
        />
        <SkillsSection
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current["skills"] = el;
          }}
          resume={resume}
          handleSkillChange={handleSkillChange}
          handleAddSkill={handleAddSkill}
          handleRemoveSkill={handleRemoveSkill}
        />
        <ProjectsSection
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current["projects"] = el;
          }}
          resume={resume}
          handleProjectChange={handleProjectChange}
          handleAddProject={handleAddProject}
          handleRemoveProject={handleRemoveProject}
        />
        <CareersSection
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current["careers"] = el;
          }}
          resume={resume}
          handleCareerChange={handleCareerChange}
          handleAddCareer={handleAddCareer}
          handleRemoveCareer={handleRemoveCareer}
        />
        <EducationsSection
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current["educations"] = el;
          }}
          resume={resume}
          handleEducationChange={handleEducationChange}
          handleAddEducation={handleAddEducation}
          handleRemoveEducation={handleRemoveEducation}
        />
        <ClubsSection
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current["clubs"] = el;
          }}
          resume={resume}
          handleClubChange={handleClubChange}
          handleAddClub={handleAddClub}
          handleRemoveClub={handleRemoveClub}
        />
      </div>
    </div>
  );
}
