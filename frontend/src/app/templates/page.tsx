import DefaultLayout from "@/components/layout/DefaultLayout";
import TemplateList from "./components/TemplateList";

export default function Templates() {
  return (
    <DefaultLayout>
      <div className="flex flex-1 flex-col items-center py-10">
        <div className="mb-15">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight font-bold text-center mb-8">
            원하는 템플릿을 선택해주세요
          </h2>
        </div>
        <TemplateList />
      </div>
    </DefaultLayout>
  );
}
