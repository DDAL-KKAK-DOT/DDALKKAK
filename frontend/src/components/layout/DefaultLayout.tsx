import { Suspense } from "react";
import Header from "@/components/Header/Header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-600">로딩 중...</div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
