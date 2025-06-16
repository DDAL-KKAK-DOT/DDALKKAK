import { useMutation } from "@tanstack/react-query";
import { uploadResume } from "@/apis/uploadResume";
import { generateResumeHtml } from "@/utils/resumeHtml";

interface UseResumeUploadOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  theme?: "type1" | "type2" | "type3" | "type4" | "type5";
}

const downloadPdf = async (pdfBlob: Blob) => {
  try {
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error;
  }
};

export function useResumeUpload(options?: UseResumeUploadOptions) {
  const mutation = useMutation({
    mutationFn: async (resumeContent: HTMLElement | null) => {
      if (!(resumeContent instanceof HTMLElement)) {
        throw new Error("Invalid resume content");
      }

      const html = generateResumeHtml(resumeContent, options?.theme);
      if (!html) {
        throw new Error("Failed to generate HTML");
      }

      try {
        const pdfBlob = await uploadResume(html);
        await downloadPdf(pdfBlob);
      } catch (error) {
        throw new Error("PDF 변환에 실패했습니다.", { cause: error });
      }
    },
    onSuccess: options?.onSuccess,
    onError: (error: Error) => {
      console.error("Error uploading resume:", error);
      options?.onError?.(error);
    },
  });

  return {
    uploadResume: mutation.mutate,
    isUploading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
