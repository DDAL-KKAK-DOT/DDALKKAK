import { useState, useCallback } from "react";

export default function useResizableForm(
  minWidth: number,
  maxWidth: number,
  defaultWidth: number,
) {
  const [formWidth, setFormWidth] = useState(defaultWidth);

  const handleDrag = useCallback(
    (x: number) => {
      setFormWidth(Math.max(minWidth, Math.min(x, maxWidth)));
    },
    [minWidth, maxWidth],
  );

  return { formWidth, handleDrag };
}
