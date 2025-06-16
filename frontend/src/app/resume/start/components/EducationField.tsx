import TextField from "@/components/Field/TextField";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import IconButton from "@/components/IconButton/IconButton";

interface EducationFieldProps {
  education: string[];
  onChange: (education: string[]) => void;
}

export default function EducationField({
  education,
  onChange,
}: EducationFieldProps) {
  const addEducation = () => {
    onChange([...education, ""]);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, value: string) => {
    const newEducation = [...education];
    newEducation[index] = value;
    onChange(newEducation);
  };

  return (
    <div className="space-y-2">
      <label className="block body-s-regular font-medium text-gray-700">
        학력
      </label>
      {education.map((value, index) => (
        <div key={index} className="flex gap-2 items-center">
          <TextField
            value={value}
            onChange={(e) => updateEducation(index, e.target.value)}
            placeholder="ex. 중앙대학교"
          />
          <IconButton
            startIcon={<Icon icon="Delete" size={16} />}
            onClick={() => removeEducation(index)}
          />
        </div>
      ))}
      <Button
        onClick={addEducation}
        className="mt-2 px-4 py-2 button-s-medium text-blue-500 hover:text-blue-700 border border-blue-500 rounded-md"
      >
        학력 추가
      </Button>
    </div>
  );
}
