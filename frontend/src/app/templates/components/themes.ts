export interface ResumeTemplateTheme {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  templateType: string;
}

export const RESUME_TEMPLATES: ResumeTemplateTheme[] = [
  {
    id: "template1",
    name: "템플릿1",
    description: "설명1",
    previewImage: "/images/templates/basic.png",
    templateType: "type1",
  },
  {
    id: "template2",
    name: "템플릿2",
    description: "설명2",
    previewImage: "/images/templates/portfolio.png",
    templateType: "type2",
  },
  {
    id: "template3",
    name: "템플릿3",
    description: "설명3",
    previewImage: "/images/templates/career.png",
    templateType: "type3",
  },
  {
    id: "template4",
    name: "템플릿4",
    description: "설명4",
    previewImage: "/images/templates/student.png",
    templateType: "type4",
  },
  {
    id: "template5",
    name: "템플릿5",
    description: "설명5",
    previewImage: "/images/templates/creative.png",
    templateType: "type5",
  },
];
