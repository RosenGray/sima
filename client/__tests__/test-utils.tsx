import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import StyledComponentsRegistry from "@/providers/StyledRegistry/StyledRegistry";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  user?: SerializedUser | null;
  initialUser?: SerializedUser | null;
}

/**
 * Custom render function that wraps components with all necessary providers
 * @param ui - The component to render
 * @param options - Render options including user for AuthProvider
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    user = null,
    initialUser = null,
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <StyledComponentsRegistry>
        <Theme>
          <AuthProvider initialUser={user || initialUser || null}>
            {children}
          </AuthProvider>
        </Theme>
      </StyledComponentsRegistry>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from React Testing Library
export * from "@testing-library/react";
export { renderWithProviders as render };
