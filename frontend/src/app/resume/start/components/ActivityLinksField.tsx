import TextField from "@/components/Field/TextField";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import IconButton from "@/components/IconButton/IconButton";

interface ActivityLinksFieldProps {
  activityLinks: string[];
  onChange: (activityLinks: string[]) => void;
}

export default function ActivityLinksField({
  activityLinks,
  onChange,
}: ActivityLinksFieldProps) {
  const addActivityLink = () => {
    onChange([...activityLinks, ""]);
  };

  const removeActivityLink = (index: number) => {
    onChange(activityLinks.filter((_, i) => i !== index));
  };

  const updateActivityLink = (index: number, value: string) => {
    const newLinks = [...activityLinks];
    newLinks[index] = value;
    onChange(newLinks);
  };

  return (
    <div className="space-y-2">
      <label className="block body-s-regular font-medium text-gray-700">
        활동 링크 <span className="text-red-500">*</span>
      </label>
      {activityLinks.map((value, index) => (
        <div key={index} className="flex gap-2 items-center">
          <TextField
            value={value}
            onChange={(e) => updateActivityLink(index, e.target.value)}
            placeholder="ex. https://github.com/example1"
          />
          <IconButton
            startIcon={<Icon icon="Delete" size={16} />}
            onClick={() => removeActivityLink(index)}
          />
        </div>
      ))}
      <Button
        onClick={addActivityLink}
        className="mt-2 px-4 py-2 button-s-medium text-blue-500 hover:text-blue-700 border border-blue-500 rounded-md"
      >
        활동 링크 추가
      </Button>
    </div>
  );
}
