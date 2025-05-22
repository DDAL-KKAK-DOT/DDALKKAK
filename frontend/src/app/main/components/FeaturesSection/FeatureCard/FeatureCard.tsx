interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="h-full flex flex-col items-center gap-6 p-8 text-center group bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-200">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
            <span className="text-blue-500 text-2xl font-medium">✓</span>
          </div>
        </div>
        <div className="absolute -inset-2 bg-blue-100/30 rounded-2xl -z-10 blur-sm group-hover:bg-blue-200/30 transition-colors duration-200" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function getDescription(title: string): string {
  switch (title) {
    case "AI 기반 이력서 작성":
      return "AI가 분석한 맞춤형 이력서 작성 가이드";
    case "다양한 템플릿":
      return "깔끔한 디자인의 다양한 템플릿";
    case "간단한 편집":
      return "간단한 편집으로 완성도 향상";
    case "PDF 다운로드":
      return "생성한 이력서를 PDF로 다운로드";
    default:
      return "";
  }
}
