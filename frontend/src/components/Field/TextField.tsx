interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function TextField({
  id,
  type = "text",
  value,
  placeholder,
  onChange,
  ...rest
}: TextFieldProps) {
  return (
    <input
      className="field w-full py-2 px-4 text-[14px] bg-blue-50 rounded-md border border-gray-300 focus:outline-none"
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default TextField;
