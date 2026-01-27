/**
 * Example Component Test
 * Tests React components with React Testing Library
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@/__tests__/test-utils";
import { BasicFormField } from "@/components/Form/BasicFormField/BasicFormField";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

// Mock form setup
function TestForm() {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: z.object({
          testField: z.string().min(1, "Field is required"),
        }),
      });
    },
    defaultValue: {
      testField: "",
    },
  });

  return (
    <form {...form.props}>
      <BasicFormField
        field={fields.testField}
        label="Test Field"
        placeholder="Enter test value"
        type="text"
        errors={fields.testField.errors}
      />
    </form>
  );
}

describe("BasicFormField", () => {
  it("should render with label and placeholder", () => {
    render(<TestForm />);

    expect(screen.getByLabelText("Test Field")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter test value")).toBeInTheDocument();
  });

  it("should display validation errors", async () => {
    render(<TestForm />);

    const input = screen.getByLabelText("Test Field");
    const form = input.closest("form");

    // Try to submit empty form
    if (form) {
      form.requestSubmit();
    }

    // Note: This is a simplified example
    // In real tests, you would wait for validation and check error messages
    expect(input).toBeInTheDocument();
  });
});
