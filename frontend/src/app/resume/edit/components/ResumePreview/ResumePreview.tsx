import type { AIResumeResponse } from "@/types/resume";
import ResumePreviewType1 from "./ResumePreviewType1";
import ResumePreviewType2 from "./ResumePreviewType2";
import ResumePreviewType3 from "./ResumePreviewType3";
import ResumePreviewType4 from "./ResumePreviewType4";
import ResumePreviewType5 from "./ResumePreviewType5";

interface Props {
  resume: AIResumeResponse;
  theme: string;
}

export default function ResumePreview({ resume, theme }: Props) {
  switch (theme) {
    case "type1":
      return <ResumePreviewType1 resume={resume} />;
    case "type2":
      return <ResumePreviewType2 resume={resume} />;
    case "type3":
      return <ResumePreviewType3 resume={resume} />;
    case "type4":
      return <ResumePreviewType4 resume={resume} />;
    case "type5":
      return <ResumePreviewType5 resume={resume} />;
    default:
      return <ResumePreviewType1 resume={resume} />;
  }
}
