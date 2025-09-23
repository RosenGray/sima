"use client";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: SerializedUser | null;
  setUser: (user: SerializedUser | null) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: SerializedUser | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<SerializedUser | null>(initialUser || null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
