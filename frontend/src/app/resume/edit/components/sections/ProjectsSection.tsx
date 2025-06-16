import React from "react";
import { Section, TextField, TextareaField } from "@/components/Field";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import IconButton from "@/components/IconButton/IconButton";
import type { AIResumeResponse } from "@/types/resume";

type ProjectsSectionProps = {
  resume: AIResumeResponse;
  handleProjectChange: (idx: number, field: string, value: string) => void;
  handleAddProject: () => void;
  handleRemoveProject: (idx: number) => void;
  ref?: React.Ref<HTMLDivElement>;
};

function ProjectsSection({
  resume,
  handleProjectChange,
  handleAddProject,
  handleRemoveProject,
  ref,
}: ProjectsSectionProps) {
  return (
    <Section
      title="프로젝트"
      description="참여한 프로젝트를 입력하세요."
      ref={ref}
    >
      <div className="space-y-6">
        {resume.projects.map((project, idx) => (
          <div
            key={idx}
            className="space-y-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex justify-between items-center gap-4">
              <TextField
                type="text"
                value={project.name}
                onChange={(e) =>
                  handleProjectChange(idx, "name", e.target.value)
                }
                placeholder="프로젝트명"
              />
              <IconButton
                variant="secondary"
                onClick={() => handleRemoveProject(idx)}
                startIcon={<Icon icon="Delete" size={16} />}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                type="text"
                value={project.period}
                onChange={(e) =>
                  handleProjectChange(idx, "period", e.target.value)
                }
                placeholder="기간 (예: 2023.01 - 2023.12)"
              />
              <TextField
                type="text"
                value={project.role}
                onChange={(e) =>
                  handleProjectChange(idx, "role", e.target.value)
                }
                placeholder="역할"
              />
            </div>
            <TextareaField
              id="description"
              value={project.description}
              onChange={(e) =>
                handleProjectChange(idx, "description", e.target.value)
              }
              placeholder="프로젝트 설명"
            />
            <TextField
              type="text"
              value={project.honor}
              onChange={(e) =>
                handleProjectChange(idx, "honor", e.target.value)
              }
              placeholder="수상/성과 (선택사항)"
            />
          </div>
        ))}
        <Button variant="secondary" className="p-2" onClick={handleAddProject}>
          프로젝트 추가
        </Button>
      </div>
    </Section>
  );
}

export default ProjectsSection;
