import TextField from "@/components/Field/TextField";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import type { InputResumeProfileRequest } from "@/types/resume";

type RequiredFieldKeys = "name" | "desired_role";
type OptionalFieldKeys = "english_name" | "contact";

interface RequiredTextFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<InputResumeProfileRequest>;
  errors: FieldErrors<InputResumeProfileRequest>;
  name: RequiredFieldKeys | OptionalFieldKeys;
  required?: boolean;
}

export default function RequiredTextField({
  id,
  label,
  placeholder,
  register,
  errors,
  name,
  required = true,
}: RequiredTextFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block body-s-regular font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <TextField
        id={id}
        type="text"
        placeholder={placeholder}
        {...register(name, { required })}
      />
      {errors[name] && required && (
        <p className="caption-m-regular text-red-500">필수 입력</p>
      )}
    </div>
  );
}
