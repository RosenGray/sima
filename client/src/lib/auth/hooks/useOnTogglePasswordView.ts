import { useCallback, useState } from "react";

type InputPasswordType = "password" | "text";

export const useOnTogglePasswordView = (
  initialState: Record<string, InputPasswordType>
) => {
  const [inputPasswordType, setInputPasswordType] = useState(initialState);

  const onTogglePasswordView = useCallback(
    (inputName: string) => () => {
      setInputPasswordType((prev) => {
        const inputType = prev[inputName] === "password" ? "text" : "password";
        return {
          ...prev,
          [inputName]: inputType,
        };
      });
    },
    []
  );

  return { inputPasswordType, onTogglePasswordView } as const;
};
