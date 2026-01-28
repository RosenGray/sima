---
name: sima-form-components
description: Reference for all Form components in @/components/Form/ — APIs, Conform integration, and usage patterns
---

# Form Components Skill

Reference for every component under `@/components/Form/`. Use with the sima-form-components rule and sima-form-creation / sima-form-edit-mode when building forms.

## Types

**Location:** `@/components/Form/types/form.types.ts`

```typescript
import { FormMode, FormModeSchema } from "@/components/Form/types/form.types";

export enum FormMode {
  Create = "create",
  Edit = "edit",
  View = "view",
}

export const FormModeSchema = z.nativeEnum(FormMode);
```

Use `FormMode` for form create vs edit vs view. Use `FormModeSchema` in Zod schemas when needed.

---

## Form

**Location:** `@/components/Form/Form.tsx`

Form wrapper that provides `useFormStatus` to children. Use with Conform’s `getFormProps` when building controlled forms.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `(formStatus: FormStatus) => ReactNode` | Render prop receiving `FormStatus` |
| `action` | `string \| ((formData: FormData) => void)` | Form action |
| `noValidate` | `boolean` | Optional, disable native validation |
| `_key` | `string` | Optional, form `key` for remounting |

### Example

```tsx
import Form from "@/components/Form/Form";
import { getFormProps } from "@conform-to/react";

<Form action={formAction} _key={String(formKey)}>
  {(formStatus) => (
    <>
      {/* form fields */}
      <button disabled={formStatus.pending}>Submit</button>
    </>
  )}
</Form>
```

---

## BasicFormField

**Location:** `@/components/Form/BasicFormField/BasicFormField.tsx`

Text/number input wired to Conform via `getInputProps`. Extends Radix `TextField.RootProps`.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `field` | `FieldMetadata<...>` | Conform field metadata |
| `type` | `string` | Input type (`"text"`, `"number"`, etc.); default `"text"` |
| `label` | `string` | Field label |
| `placeholder` | `string` | Placeholder |
| `size` | `"1" \| "2" \| "3"` | Radix size |
| `defaultValue` | `string \| number` | Initial value |
| `dataIsValid` | `boolean` | Validity for styling |
| `errors` | `string[]` | Validation errors |
| `isMandatory` | `boolean` | Shows `*` when required |
| `containerStyle` | `React.CSSProperties` | Optional container styles |
| `disabledAutocomplete` | `boolean` | Use with `useBrowser` for Chrome |
| `anotherLabel` | `string` | Extra hint below input |
| `showEmailDisclaimer` | `boolean` | Renders `EmailDisclaimer` |
| `_key` | `string` | Optional key |
| `ref` | `Ref<HTMLInputElement>` | Optional ref |
| `children` | `ReactNode` | Optional slot (e.g. `TextField.Slot`) |

### Conform

```tsx
<TextField.Root {...getInputProps(field, { type })} ... />
```

### Example

```tsx
<BasicFormField
  field={title}
  type="text"
  label="Название"
  placeholder="Введите название"
  size="3"
  defaultValue={defaultValue?.title}
  dataIsValid={!title.errors?.length}
  errors={title.errors}
  isMandatory
  disabled={isPending}
/>
```

---

## SelectSingle

**Location:** `@/components/Form/SelectSingle/SelectSingle.tsx`  
**Styles:** `SelectSingle.styles.ts` (react-select `StylesConfig`)  
**Types:** `Select.types.ts` — `SelectOption { value: string; label: string }`

Single-select dropdown using `react-select`. Uses `useInputControl` and `PortalProvider` for menu positioning.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `field` | `FieldMetadata<...>` | Conform field |
| `options` | `{ value: string; label: string }[]` | Select options |
| `defaultValue` | `Option` | Initial selected option |
| `label` | `string` | Label |
| `errors` | `string[]` | Validation errors |
| `isMandatory` | `boolean` | Shows `*` |
| `className` | `string` | Optional class |
| + | `Props` (react-select) | Any react-select props (e.g. `isDisabled`) |

### Example

```tsx
<SelectSingle
  field={district}
  label="Район"
  options={districtOptions}
  defaultValue={defaultValue?.district ? { value: defaultValue.district, label: "..." } : undefined}
  errors={district.errors}
  isMandatory
  isDisabled={isPending}
/>
```

### Dependent options

Compute options with `useMemo` from parent field value; disable when parent empty:

```tsx
const modelOptions = useMemo(
  () => (manufacturer.value ? getModels(manufacturer.value) : []),
  [manufacturer.value]
);
<SelectSingle ... options={modelOptions} isDisabled={!manufacturer.value} />
```

---

## Checkbox

**Location:** `@/components/Form/Checkbox/Checkbox.tsx`  
**Styles:** `Checkbox.styles.ts`

Single checkbox. Uses Radix `Checkbox` and Conform `getInputProps(field, { type: "checkbox" })`.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `field` | `FieldMetadata<boolean \| string>` | Conform field |
| `label` | `string` | Label |
| `labelSize` | `"1" \| "2" \| "3" \| "4"` | Default `"3"` |
| `size` | `"1" \| "2" \| "3"` | Radix checkbox size; default `"3"` |
| `errors` | `string[]` | Validation errors |
| `isMandatory` | `boolean` | Shows `*` |
| + | `CheckboxProps` | Other Radix Checkbox props (`mb`, `mt`, etc.) |

### Example

```tsx
<Checkbox
  field={acceptTerms}
  label="Я согласен с условиями"
  errors={acceptTerms.errors}
  isMandatory
  disabled={isPending}
/>
```

Schema: `z.boolean()` or `z.string().optional().superRefine(...)` for `"on"`.

---

## CheckboxButtonGroup

**Location:** `@/components/Form/CheckboxButtonGroup/CheckboxButtonGroup.tsx`  
**Styles:** `CheckboxButtonGroup.styles.ts`

Multi-select checkboxes rendered as button-style options. Use for tags, adjustments, etc.

### Types

```typescript
interface CheckboxButtonOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `field` | `FieldMetadata<string[] \| number[]>` | Conform field |
| `label` | `string` | Legend |
| `subLabel` | `string` | Optional subtitle |
| `options` | `CheckboxButtonOption[]` | Options (value, label, optional icon) |
| `errors` | `string[]` | Validation errors |
| `isDisabled` | `boolean` | Disable all options |
| `dataAttrList` | `string` | Optional `data-nagish` on list |
| `dataAttrLabel` | `string` | Optional `data-nagish` on labels |
| `dataAttrInput` | `string` | Optional `data-nagish` on inputs |

### Conform

- Fieldset: `getFieldsetProps(field)`.
- Inputs: `getCollectionProps(field, { type: "checkbox", options: options.map(o => o.value) })`.
- Same `name`; Conform aggregates into an array.

### Schema

`z.array(z.coerce.number()).optional()` or `z.array(z.string()).optional()`. Option `value` must be string.

### Default value

- Create: `[]`.
- Edit: `(entity?.field ?? []).map(String)`.

### Example

```tsx
<CheckboxButtonGroup
  field={adjustments}
  label="Особенности"
  subLabel="Выберите подходящие"
  options={[
    { value: "1", label: "Вариант 1", icon: <SomeIcon /> },
    { value: "2", label: "Вариант 2" },
  ]}
  errors={adjustments.errors}
  isDisabled={isPending}
/>
```

**Filter counterpart:** For filter UI (no Conform, no form), use `SearchCheckboxButtonGroup` in `@/components/filters/`. Same visual style (fieldset, labels, icons); controlled via `value` / `onChange`. See sima-filters and `app/(public)/pets/for-sale/_components/Filters/FiltersClient.tsx`.

---

## DropFilesInput

**Location:** `@/components/Form/DropFilesInput/DropFilesInput.tsx`  
**Styles:** `DropFilesInput.styles.ts`  
**Utils:** `DropFilesInput.utils.ts`

Drag-and-drop file input. Uses `react-dropzone` and Conform `getInputProps(field, { type: "file" })`.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `field` | `FieldMetadata<File[] \| undefined>` | Conform field |
| `onFilesDrop` | `(files: File[]) => void` | Called when files are added/replaced |
| `files` | `File[]` | Current files (state) |
| `accept` | `{ [k: string]: string[] } \| undefined` | e.g. `{ "image/*": [] }` |
| `maxSize` | `number` | Max size in bytes |
| `maxFiles` | `number` | Max file count |
| `errors` | `string[]` | Validation errors |
| `disabled` | `boolean` | Disable dropzone |
| `existingFilesLength` | `number` | For edit mode; existing images not to delete |

### Usage

- `useState<File[]>` for `files`.
- `onFilesDrop` updates that state (replace or merge).
- In form `onValidate`, append `files` to `FormData` (e.g. as `images`).
- Use `ImagesPreviewer` elsewhere to show previews and handle delete.
- Edit mode: pass `existingFilesLength={existingImages.filter(i => !i.toBeDeleted).length}` when using `ImagesPreviewer` with existing images.

### Example

```tsx
const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

<DropFilesInput
  field={images}
  onFilesDrop={setSelectedFiles}
  files={selectedFiles}
  accept={{ "image/*": [] }}
  maxSize={5 * 1024 * 1024}
  maxFiles={10}
  errors={images.errors}
  disabled={isPending}
  existingFilesLength={existingImages.filter(i => !i.toBeDeleted).length}
/>
```

---

## PhoneFormField

**Location:** `@/components/Form/PhoneFormField/PhoneFormField.tsx`

Phone input. Same structure as `BasicFormField` with `type="tel"`.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `field` | `FieldMetadata<...>` | Conform field |
| `label` | `string` | Label |
| `placeholder` | `string` | Placeholder |
| `size` | `"1" \| "2" \| "3"` | Radix size |
| `defaultValue` | `string` | Initial value |
| `errors` | `string[]` | Validation errors |
| `isMandatory` | `boolean` | Shows `*` |
| `_key` | `string` | Optional key |
| `ref` | `Ref<HTMLInputElement>` | Optional ref |
| `children` | `ReactNode` | Optional slot |

### Example

```tsx
<PhoneFormField
  field={contactPhone}
  label="Телефон"
  placeholder="050-0000000"
  size="3"
  defaultValue={defaultValue?.contactPhone}
  errors={contactPhone.errors}
  isMandatory
  disabled={isPending}
/>
```

---

## PriceFormField

**Location:** `@/components/Form/PriceFormField/PriceFormField.tsx`

Price input with comma formatting. Wraps `BasicFormField`, uses `formatNumberWithCommas` from `@/utils/common`, renders `₪`.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `field` | `FieldMetadata<...>` | Conform field |
| `label` | `string` | Label |
| `placeholder` | `string` | e.g. `"0"` |
| `size` | `"1" \| "2" \| "3"` | Radix size |
| `defaultValue` | `string \| number` | Initial value (string preferred) |
| `dataIsValid` | `boolean` | Validity for styling |
| `errors` | `string[]` | Validation errors |
| `isMandatory` | `boolean` | Shows `*` |
| `anotherLabel` | `string` | Optional hint |
| `showEmailDisclaimer` | `boolean` | Show `EmailDisclaimer` |
| `_key` | `string` | Optional key |
| `ref` | `Ref<HTMLInputElement>` | Optional ref |

### Schema

Use string + regex + transform (see sima-form-creation):

```ts
price: z
  .string({ required_error: "Введите цену" })
  .refine((val) => /^-?\d[\d,]*$/.test(val), { message: "Цена должна быть числом, содержащим запятые." })
  .transform((val) => { const cleaned = val.replace(/,/g, ""); return Number(cleaned); })
```

### Example

```tsx
<PriceFormField
  field={price}
  label="Цена (₪)"
  placeholder="0"
  size="3"
  defaultValue={entity?.price?.toString() ?? ""}
  dataIsValid={!price.errors?.length}
  errors={price.errors}
  isMandatory
  disabled={isPending}
/>
```

---

## TextAreaField

**Location:** `@/components/Form/TextAreaField/TextAreaField.tsx`

Multi-line text. Uses Radix `TextArea` and `getTextareaProps(field)`.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `field` | `FieldMetadata<string \| ...>` | Conform field |
| `label` | `string` | Label |
| `placeholder` | `string` | Placeholder |
| `size` | `"1" \| "2" \| "3"` | Radix size |
| `dataIsValid` | `boolean` | Validity for styling |
| `errors` | `string[]` | Validation errors |
| `isMandatory` | `boolean` | Shows `*` |
| `ref` | `Ref<HTMLTextAreaElement>` | Optional ref |
| + | `TextAreaProps` | Other Radix TextArea props |

### Example

```tsx
<TextAreaField
  field={description}
  label="Описание"
  placeholder="Опишите подробнее..."
  size="3"
  dataIsValid={!description.errors?.length}
  errors={description.errors}
  isMandatory
  disabled={isPending}
/>
```

---

## AuthTextField

**Location:** `@/components/Form/AuthTextField/AuthTextField.tsx`  
**Styles:** `AuthTextField.styles.ts` (`AuthTextFieldRoot`)

Text input for auth forms (login, register, reset/replace password). **No Conform `field`.** Uses `dataIsValid` and `errors` for validation UI.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `dataIsValid` | `boolean` | Drives invalid styling |
| `errors` | `string[]` | Error messages |
| `placeholder` | `string` | Also used as label |
| `size` | `"1" \| "2" \| "3"` | Radix size |
| `defaultValue` | `string` | Initial value |
| `_key` | `string` | Optional key |
| `isMandatory` | `boolean` | Shows `*` |
| + | `TextField.RootProps` | e.g. `name`, `type`, `required` |

### Example

```tsx
<AuthTextField
  placeholder="Email"
  type="email"
  name="email"
  dataIsValid={!emailError}
  errors={emailError ? [emailError] : []}
  isMandatory
/>
```

---

## FormCard

**Location:** `@/components/Form/FormCard/FormCard.styles.ts`

Styled Radix `Card` for form sections (e.g. auth). No dedicated component file.

### Import

```tsx
import { FormCard } from "@/components/Form/FormCard/FormCard.styles";
```

### Usage

```tsx
<FormCard size="4">
  {/* form content */}
</FormCard>
```

Accepts standard Radix `Card` props (e.g. `size`).

---

## File Structure

```
@/components/Form/
├── types/
│   └── form.types.ts         # FormMode, FormModeSchema
├── Form.tsx
├── BasicFormField/
│   └── BasicFormField.tsx
├── SelectSingle/
│   ├── SelectSingle.tsx
│   ├── SelectSingle.styles.ts
│   └── Select.types.ts
├── Checkbox/
│   ├── Checkbox.tsx
│   └── Checkbox.styles.ts
├── CheckboxButtonGroup/
│   ├── CheckboxButtonGroup.tsx
│   └── CheckboxButtonGroup.styles.ts
├── DropFilesInput/
│   ├── DropFilesInput.tsx
│   ├── DropFilesInput.styles.ts
│   └── DropFilesInput.utils.ts
├── PhoneFormField/
│   └── PhoneFormField.tsx
├── PriceFormField/
│   └── PriceFormField.tsx
├── TextAreaField/
│   └── TextAreaField.tsx
├── AuthTextField/
│   ├── AuthTextField.tsx
│   └── AuthTextField.styles.ts
└── FormCard/
    └── FormCard.styles.ts
```

---

## Cross-References

- **sima-form-components** (this skill): Form primitive APIs and usage.
- **sima-form-creation**: Building publish-ad create forms; schema, layout, server actions.
- **sima-form-edit-mode**: Edit flows, existing images, `FormMode`.
- **sima-styling**: Radix UI, styled-components, `"use client"` for `.styles.ts`.
