import { AIResumeResponse, InputResumeProfileRequest } from "@/types/resume";
import { createCustomAxios } from "./apiClient";

export async function fetchAIResume(
  input: InputResumeProfileRequest,
): Promise<AIResumeResponse> {
  const { data } = await createCustomAxios().post<AIResumeResponse>(
    "/api/profile",
    input,
  );
  return data;
}
