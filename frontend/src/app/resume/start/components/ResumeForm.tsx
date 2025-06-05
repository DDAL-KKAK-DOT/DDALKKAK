import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "@/components/Field/Section";
import Button from "@/components/Button/Button";
import { InputResumeProfileRequest, AIResumeResponse } from "@/types/resume";
import { useSubmitAIResumeMutation } from "@/hooks/queries/useSubmitAIResumeMutation";
import { useLocalStorageObject } from "@/hooks/useLocalStorageObject";
import RequiredTextField from "./RequiredTextField";
import EducationField from "./EducationField";
import ActivityLinksField from "./ActivityLinksField";

export default function ResumeForm() {
  const router = useRouter();
  const [education, setEducation] = useState<string[]>([""]);
  const [activityLinks, setActivityLinks] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);
  const [activityLinksError, setActivityLinksError] = useState<string | null>(
    null,
  );

  const { setItem: setResume } =
    useLocalStorageObject<AIResumeResponse>("resumeData");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputResumeProfileRequest>({
    defaultValues: {
      activity_links: [""],
    },
  });

  const { mutate, isPending } = useSubmitAIResumeMutation();
  const onSuccess = (data: AIResumeResponse) => {
    setResume(data);
    router.push("/resume/edit");
  };
  const onError = (e: Error) => {
    setError(e.message);
  };

  const validateActivityLinks = () => {
    const hasEmptyLink = activityLinks.some((link) => link.trim() === "");
    if (hasEmptyLink) {
      setActivityLinksError("활동 링크를 모두 입력해주세요");
      return false;
    }
    setActivityLinksError(null);
    return true;
  };

  const onInvalid = () => {
    validateActivityLinks();
  };

  const onSubmit = (formData: InputResumeProfileRequest) => {
    if (!validateActivityLinks()) {
      return;
    }

    const payload: InputResumeProfileRequest = {
      ...formData,
      education,
      activity_links: activityLinks,
    };
    mutate(payload, { onSuccess, onError });
  };

  return (
    <Section
      title="기본 정보"
      description="기본 정보를 입력하면 AI가 이력서를 생성해줍니다."
      className="max-w-[800px] w-full mb-5"
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="space-y-6 w-full"
      >
        <RequiredTextField
          id="name"
          label="이름"
          placeholder="ex. 홍길동"
          register={register}
          errors={errors}
          name="name"
          required={true}
        />

        <RequiredTextField
          id="english_name"
          label="영문 이름"
          placeholder="ex. GilDong Hong"
          register={register}
          errors={errors}
          name="english_name"
          required={false}
        />

        <EducationField education={education} onChange={setEducation} />

        <RequiredTextField
          id="desired_role"
          label="희망 직무"
          placeholder="ex. 프론트엔드 엔지니어"
          register={register}
          errors={errors}
          name="desired_role"
          required={true}
        />

        <RequiredTextField
          id="contact"
          label="연락처"
          placeholder="010-1234-5678"
          register={register}
          errors={errors}
          name="contact"
          required={false}
        />

        <div className="space-y-2">
          <ActivityLinksField
            activityLinks={activityLinks}
            onChange={setActivityLinks}
          />
          {activityLinksError && (
            <p className="caption-m-regular text-red-500">
              {activityLinksError}
            </p>
          )}
        </div>

        <Button
          variant="primary"
          fullWidth
          type="submit"
          className="p-4 mt-4"
          disabled={isPending}
        >
          {isPending ? "생성 중..." : "AI 이력서 결과 받기"}
        </Button>
      </form>

      {error && (
        <div className="body-m-regular mt-4 p-4 bg-red-50 text-red-500 rounded-md">
          {error}: 에러가 발생했습니다. 다시 시도해주세요.
        </div>
      )}
    </Section>
  );
}
