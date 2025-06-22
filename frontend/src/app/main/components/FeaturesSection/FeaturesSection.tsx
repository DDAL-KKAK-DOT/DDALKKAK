import FeatureCard from "./FeatureCard/FeatureCard";

const features = [
  {
    title: "AI 기반 이력서 작성",
    description: "AI가 분석한 맞춤형 이력서 작성 가이드",
  },
  {
    title: "다양한 템플릿",
    description: "깔끔한 디자인의 다양한 템플릿",
  },
  {
    title: "간단한 편집",
    description: "간단한 편집으로 완성도 향상",
  },
  {
    title: "PDF 다운로드",
    description: "생성한 이력서를 PDF로 다운로드",
  },
];

export default function FeaturesSection() {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex flex-wrap justify-center gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="w-full max-w-sm sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
