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
    name: "Modern Basic",
    description: "깔끔하고 가장 기본적인 노션 스타일",
    previewImage: "/images/type1-preview.png",
    templateType: "type1",
  },
  {
    id: "template2",
    name: "Clean Blocks",
    description: "블럭 스타일로 섹션이 잘 구분되는 구조",
    previewImage: "/images/type2-preview.png",
    templateType: "type2",
  },
  {
    id: "template3",
    name: "Dark Mode",
    description: "다크 테마로 감각적인 인상을 주는 템플릿",
    previewImage: "/images/type3-preview.png",
    templateType: "type3",
  },
  {
    id: "template4",
    name: "Compact Sidebar",
    description: "사이드바 구조로 정보 압축에 적합",
    previewImage: "/images/type4-preview.png",
    templateType: "type4",
  },
  {
    id: "template5",
    name: "Modern Green",
    description: "초록 포인트로 산뜻하고 안정적인 느낌",
    previewImage: "/images/type5-preview.png",
    templateType: "type5",
  },
];
