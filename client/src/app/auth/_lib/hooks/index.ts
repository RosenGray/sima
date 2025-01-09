import { useCallback, useState } from "react";
import { InputPasswordType } from "../config";

export const useonTogglePasswordView = (
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
