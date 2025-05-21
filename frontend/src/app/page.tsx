export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <main className="flex items-center justify-center p-8 pb-20 sm:p-20 ">
        <div className="flex flex-col items-center gap-8">
          <h1 className="title-l-bold text-center">Welcome to DDALKKAK</h1>
          <button className="button-l-semibold px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            시작하기
          </button>
          <p className="caption-m-regular text-gray-500">
            © 2024 DDALKKAK. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
