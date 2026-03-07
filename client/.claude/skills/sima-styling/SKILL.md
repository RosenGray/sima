---
name: sima-styling
description: Component structure, styled components best practices, and responsive styling guidelines using Radix UI
---

## Component Structure

- Always use Radix UI components
- Always use Radix UI theme and colors system
- Always use Radix UI icons
- For any other additional styling, please use styled components
- When creating a component, the name of the component always starts with a big letter and .tsx format; for example: `Header.tsx`
- When creating a styled component, it will have the same component name following by `.styles.ts` - for example: `Header.styles.ts`
- When creating a styled component, please check first if Radix UI has this element already. For example, it has a `Box`, so you can do `styled(Box)` instead of creating a `div`

## Styled Components Best Practices

- **ALWAYS add `"use client"` directive at the top of ALL `.styles.ts` files** that use `styled-components`. This is required because `styled-components` uses React context internally, which only works in Client Components.
- Always extend Radix UI components when possible: `styled(Box)`, `styled(Grid)`, `styled(Flex)`, `styled(Card)`, etc.
- Use Radix UI CSS variables for theming: `var(--accent-a3)`, `var(--gray-6)`, `var(--radius-4)`, `var(--space-4)`, etc.
- Import styled-components: `import { styled } from "styled-components"` or `import styled from "styled-components"`
- Import Radix components: `import { Box, Flex, Grid, Card } from "@radix-ui/themes"`

### Critical: "use client" Directive

**Every `.styles.ts` file that imports `styled` from `styled-components` MUST have `"use client"` as the first line:**

```typescript
"use client";
import { Box } from "@radix-ui/themes";
import { styled } from "styled-components";

export const MyStyledComponent = styled(Box)`
  /* styles */
`;
```

This is required even when the styles file is imported by a Server Component, because `styled-components` uses React Context internally which only works in Client Components.

## Responsive Styling and Layout

### Breakpoints

The project uses breakpoints defined in `@/globals.ts`:
- `xs`: 520px
- `sm`: 768px
- `md`: 1024px
- `lg`: 1280px
- `xl`: 1640px

**ALWAYS prioritize Radix UI responsive props over CSS media queries in styled-components.**

### Responsive Props Pattern

Radix UI components support responsive props using objects with breakpoint keys:
- `initial`: Base/mobile styles (applies to all screen sizes by default)
- `xs`: Extra small screens (≥520px)
- `sm`: Small screens (≥768px)
- `md`: Medium screens (≥1024px)
- `lg`: Large screens (≥1280px)
- `xl`: Extra large screens (≥1640px)

### Common Responsive Props

#### Layout Props

**Grid `columns` prop:**
```tsx
<Grid
  columns={{ initial: "1", md: "2", lg: "3" }}
>
```

**Grid/Flex `gap` prop:**
```tsx
<Grid gap={{ initial: "4", md: "5", lg: "6" }}>
<Flex gap={{ initial: "4", md: "5" }}>
```

**Flex `direction` prop:**
```tsx
<Flex direction={{ initial: "column", md: "row" }}>
```

**Flex `align` prop:**
```tsx
<Flex align={{ initial: "stretch", md: "center" }}>
```

**Flex `justify` prop:**
```tsx
<Flex justify={{ initial: "start", md: "between" }}>
```

#### Spacing Props

**Padding props (`p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`):**
```tsx
<Box px={{ initial: "4", sm: "6", md: "8" }}>
<Box py={{ initial: "5", md: "7" }}>
<Box p={{ initial: "3", md: "4" }}>
```

**Margin props (`m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr`):**
```tsx
<Box mt={{ initial: "4", md: "6" }}>
```

#### Typography Props

**Text/Heading `size` prop:**
```tsx
<Heading size={{ initial: "6", md: "7" }}>
<Text size={{ initial: "3", md: "4" }}>
```

### When to Use CSS Media Queries in Styled Components

Only use CSS media queries in styled-components for:
1. Complex conditional styling that can't be achieved with Radix responsive props
2. Custom animations or transitions that need breakpoint-specific behavior
3. Display/hide logic that requires `display: none` at specific breakpoints

When using media queries, reference breakpoints from `@/globals`:
```tsx
import { breakpoints } from "@/globals";

export const MyComponent = styled(Box)`
  padding: var(--space-4);

  @media (min-width: ${breakpoints.md}px) {
    padding: var(--space-6);
  }

  @media (max-width: ${breakpoints.sm - 1}px) {
    display: none;
  }
`;
```

### Examples

**Grid with responsive columns and gap:**
```tsx
<Grid
  columns={{ initial: "1", xs: "2", md: "3" }}
  gap={{ initial: "4", md: "5", lg: "6" }}
>
```

**Form container with responsive padding:**
```tsx
<FormShell px={{ initial: "4", sm: "6", md: "8" }} py={{ initial: "5", md: "7" }}>
```

**Flex container with responsive direction and alignment:**
```tsx
<Flex
  direction={{ initial: "column", md: "row" }}
  align={{ initial: "stretch", md: "center" }}
  justify="between"
  gap={{ initial: "4", md: "6" }}
>
```

**Styled Grid component (minimal styling, props handle responsiveness):**
```tsx
// In .styles.ts
export const MyGrid = styled(Grid)``;

// In component
<MyGrid
  columns={{ initial: "1", md: "2" }}
  gap={{ initial: "4", md: "5" }}
>
```

### Priority Order

1. **First choice**: Use Radix UI responsive props directly on components
2. **Second choice**: Use Radix UI responsive props on styled components that extend Radix components
3. **Last resort**: Use CSS media queries in styled-components only when absolutely necessary

### Common Patterns

- **Mobile-first approach**: Always start with `initial` value for mobile, then add larger breakpoints
- **Progressive enhancement**: Add more spacing/columns as screen size increases
- **Consistent spacing scale**: Use Radix space scale values: `"0"`, `"1"`, `"2"`, `"3"`, `"4"`, `"5"`, `"6"`, `"7"`, `"8"`, `"9"`
- **Column patterns**: Common patterns include `"1"` → `"2"` → `"3"` or `"1"` → `"2"` for forms
