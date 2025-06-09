import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";

interface Props {
  templateType: string;
}

const ResumeTypeSelector = ({ templateType }: Props) => {
  const router = useRouter();
  return (
    <div className="flex gap-2 mr-4">
      <Button
        variant="selector"
        isPressed={templateType === "type1"}
        onClick={() => router.push("?type=type1")}
      >
        1
      </Button>
      <Button
        variant="selector"
        isPressed={templateType === "type2"}
        onClick={() => router.push("?type=type2")}
      >
        2
      </Button>
      <Button
        variant="selector"
        isPressed={templateType === "type3"}
        onClick={() => router.push("?type=type3")}
      >
        3
      </Button>
      <Button
        variant="selector"
        isPressed={templateType === "type4"}
        onClick={() => router.push("?type=type4")}
      >
        4
      </Button>
      <Button
        variant="selector"
        isPressed={templateType === "type5"}
        onClick={() => router.push("?type=type5")}
      >
        5
      </Button>
    </div>
  );
};

export default ResumeTypeSelector;
