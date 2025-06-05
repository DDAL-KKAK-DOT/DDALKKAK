import { useEffect, useRef, useState } from "react";

interface FieldSetProps {
  legend: string;
  description?: string;
  children: React.ReactNode;
  warningText?: string;
}

function FieldSet({
  legend,
  description,
  warningText,
  children,
}: FieldSetProps) {
  const [isFocused, setIsFocused] = useState(false);
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  // 현재 유저가 진행 중인 필드 식별을 위한 이벤트 추가
  useEffect(() => {
    const fieldset = fieldsetRef.current;
    if (!fieldset) return;

    const handleFocus = (event: FocusEvent) => {
      if ((event.target as HTMLElement).classList.contains("field")) {
        setIsFocused(true);
      }
    };

    const handleBlur = (event: FocusEvent) => {
      if ((event.target as HTMLElement).classList.contains("field")) {
        setIsFocused(false);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).classList.contains("field")) {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }
    };

    const fields = fieldset.querySelectorAll(".field");
    fields.forEach((field) => {
      field.addEventListener("focus", handleFocus as EventListener);
      field.addEventListener("blur", handleBlur as EventListener);
      field.addEventListener("click", handleClick as EventListener);
    });

    return () => {
      fields.forEach((field) => {
        field.removeEventListener("focus", handleFocus as EventListener);
        field.removeEventListener("blur", handleBlur as EventListener);
        field.removeEventListener("click", handleClick as EventListener);
      });
    };
  }, []);

  return (
    <fieldset
      ref={fieldsetRef}
      className={`p-6 rounded-xl border ${isFocused ? "border-blue-500" : "border-gray-300"} bg-white`}
    >
      {description && (
        <p className="mb-3 text-sm font-semibold text-gray-700 whitespace-pre-line">
          {description}
        </p>
      )}

      <legend className="px-2 mb-2 text-sm font-semibold text-gray-700 required">
        {legend}
      </legend>

      <div className="space-y-2">{children}</div>

      {warningText && (
        <p className="h-2 mt-1 text-xs text-red-500">{warningText}</p>
      )}
    </fieldset>
  );
}

export default FieldSet;
