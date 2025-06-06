import { useState, useEffect, useCallback } from "react";
import type { AIResumeResponse } from "@/types/resume";
import { useLocalStorageObject } from "./useLocalStorageObject";
import { useDebounceCallback } from "./useDebounce";

const defaultResume: AIResumeResponse = {
  profileInfo: {
    name: "",
    english_name: "",
    contact: "",
    desired_role: "",
    educations: [],
    activity_links: [],
  },
  shortIntro: "",
  skills: [],
  projects: [],
  careers: [],
  educations: [],
  clubs: [],
};

const STORAGE_KEY = "resumeData";

export function useResume() {
  const { getItem, setItem } =
    useLocalStorageObject<AIResumeResponse>(STORAGE_KEY);
  const [resume, setResumeState] = useState<AIResumeResponse>(defaultResume);
  const [isInitialized, setIsInitialized] = useState(false);

  // 초기 데이터 로딩
  useEffect(() => {
    const stored = getItem();
    if (stored) {
      // 저장된 데이터가 있지만 일부 필드가 누락된 경우를 대비해 기본값과 병합
      const mergedResume: AIResumeResponse = {
        profileInfo: {
          ...defaultResume.profileInfo,
          ...stored.profileInfo,
          educations: stored.profileInfo?.educations || [],
          activity_links: stored.profileInfo?.activity_links || [],
        },
        shortIntro: stored.shortIntro || "",
        skills: stored.skills || [],
        projects: stored.projects || [],
        careers: stored.careers || [],
        educations: stored.educations || [],
        clubs: stored.clubs || [],
      };
      setResumeState(mergedResume);
    }
    setIsInitialized(true);
  }, [getItem]);

  // 디바운스된 로컬 스토리지 업데이트 함수
  const debouncedSetItem = useDebounceCallback<[AIResumeResponse], void>(
    useCallback(
      (value: AIResumeResponse) => {
        if (isInitialized) {
          setItem(value);
        }
      },
      [isInitialized, setItem],
    ),
    1000,
  );

  // resume 상태가 변경될 때마다 디바운스된 로컬 스토리지 업데이트
  useEffect(() => {
    debouncedSetItem(resume);
  }, [resume, debouncedSetItem]);

  // 상태 업데이트 함수를 메모이제이션
  const setResume = useCallback(
    (
      updater:
        | AIResumeResponse
        | ((prev: AIResumeResponse) => AIResumeResponse),
    ) => {
      if (typeof updater === "function") {
        setResumeState((prev) => {
          const next = updater(prev);
          return next;
        });
      } else {
        setResumeState(updater);
      }
    },
    [],
  );

  return { resume, setResume };
}
