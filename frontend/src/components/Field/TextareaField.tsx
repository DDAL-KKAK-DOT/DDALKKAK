import React from "react";

interface TextareaFieldProps {
  id: string;
  value: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

function TextareaField({
  id,
  value,
  placeholder,
  onChange,
  ...rest
}: TextareaFieldProps) {
  return (
    <textarea
      className="field w-full py-2 px-4 text-[14px] bg-blue-50 rounded-md border border-gray-300 focus:outline-none min-h-[60px]"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default TextareaField;
