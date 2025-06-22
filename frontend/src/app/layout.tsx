import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/globals.css";
import Providers from "./providers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "DDALKKAK - AI 기반 이력서 작성 서비스",
  description:
    "AI 기술을 활용하여 더 쉽고 빠르게 완성도 높은 이력서를 작성해보세요.",
  icons: {
    icon: "/images/main-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center">
                <div className="text-gray-600">로딩 중...</div>
              </div>
            }
          >
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
