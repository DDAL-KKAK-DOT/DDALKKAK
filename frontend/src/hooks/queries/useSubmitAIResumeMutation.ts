import { useMutation } from "@tanstack/react-query";
import { fetchAIResume } from "@/apis/fetchAIResume";
import { AIResumeResponse, InputResumeProfileRequest } from "@/types/resume";

export function useSubmitAIResumeMutation() {
  return useMutation<AIResumeResponse, Error, InputResumeProfileRequest>({
    mutationFn: (data: InputResumeProfileRequest) => fetchAIResume(data),
  });
}
