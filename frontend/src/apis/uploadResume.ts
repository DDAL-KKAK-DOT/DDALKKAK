import { createCustomAxios } from "./apiClient";

export interface UploadResumeResponse {
  success: boolean;
  error?: string;
}

export async function uploadResume(htmlContent: string): Promise<Blob> {
  const blob = new Blob([htmlContent], { type: "text/html" });
  const formData = new FormData();
  formData.append("html_file", blob, "resume.html");

  try {
    const { data } = await createCustomAxios().post<Blob>(
      "/api/convert/html-to-pdf",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      },
    );
    return data;
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
}
