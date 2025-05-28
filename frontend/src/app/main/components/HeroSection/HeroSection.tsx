import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        <div className="w-[200px] h-[250px] sm:w-[240px] sm:h-[300px] lg:w-[320px] lg:h-[400px] relative flex-shrink-0">
          <Image
            src="/images/main-character.png"
            alt="DDALKKAK 캐릭터"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col max-w-xl text-center lg:text-left">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl text-gray-900 leading-tight font-bold">
              AI로 더 쉽게
              <br />
              <span className="text-blue-500">완벽한 이력서</span>를
              <br />
              작성해보세요
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              어쩌구저쩌구 서비스 설명 어쩌구저쩌구 서비스 설명 어쩌구저쩌구
              서비스 설명 어쩌구저쩌구 서비스 설명 어쩌구저쩌구 서비스 설명
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <Link href="/templates" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" fullWidth>
                무료로 시작하기
              </Button>
            </Link>
            <p className="text-sm text-gray-500 text-center">
              지금 시작하면 첫 이력서 작성이 무료!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
