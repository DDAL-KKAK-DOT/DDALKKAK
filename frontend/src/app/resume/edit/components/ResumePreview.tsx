import type { AIResumeResponse } from "@/types/resume";

interface ResumePreviewProps {
  resume: AIResumeResponse;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="w-full h-full bg-white">
      <div className="min-h-[600px] p-10 mx-auto">
        {/* 프로필 섹션 */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="text-4xl font-bold mb-3 text-gray-900">
            {resume.profileInfo.name || "이름"}
            {resume.profileInfo.english_name && (
              <span className="text-2xl font-normal text-gray-600 ml-3">
                {resume.profileInfo.english_name}
              </span>
            )}
          </div>
          <div className="text-lg text-gray-600 mb-3 flex flex-wrap gap-2">
            {resume.profileInfo.contact && (
              <span className="text-gray-500">
                {resume.profileInfo.contact}
              </span>
            )}
            {resume.profileInfo.desired_role && (
              <span className="text-gray-500">
                • {resume.profileInfo.desired_role}
              </span>
            )}
          </div>
        </div>

        {/* 한줄소개 */}
        {resume.shortIntro && (
          <div className="mb-8 text-lg text-gray-700 leading-relaxed italic border-l-4 border-gray-200 pl-4">
            {resume.shortIntro}
          </div>
        )}

        {/* 기술스택 */}
        {resume.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              기술스택
            </h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 프로젝트 */}
        {resume.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              프로젝트
            </h2>
            {resume.projects.map((p, i) => (
              <div key={i} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.name}
                  </h3>
                  <span className="text-sm text-gray-500">{p.period}</span>
                </div>
                <div className="text-gray-700 font-medium mb-2">{p.role}</div>
                <div className="text-gray-700 leading-relaxed mb-2">
                  {p.description}
                </div>
                {p.honor && (
                  <div className="text-sm text-blue-600 font-medium">
                    {p.honor}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 경력 */}
        {resume.careers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              경력
            </h2>
            {resume.careers.map((c, i) => (
              <div key={i} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {c.role}
                  </h3>
                  <span className="text-sm text-gray-500">{c.period}</span>
                </div>
                <div className="text-gray-700 font-medium mb-2">
                  @{c.company}
                </div>
                <div className="text-gray-700 leading-relaxed">
                  {c.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 학력 */}
        {resume.educations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              학력
            </h2>
            {resume.educations.map((e, i) => (
              <div key={i} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {e.name}
                  </h3>
                  <span className="text-sm text-gray-500">{e.period}</span>
                </div>
                <div className="text-gray-700 leading-relaxed">
                  {e.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 동아리/활동 */}
        {resume.clubs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              동아리/활동
            </h2>
            {resume.clubs.map((c, i) => (
              <div key={i} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {c.name}
                  </h3>
                  <span className="text-sm text-gray-500">{c.period}</span>
                </div>
                <div className="text-gray-700 leading-relaxed">
                  {c.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
