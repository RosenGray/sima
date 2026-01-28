"use client";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: SerializedUser | null;
  setUser: (user: SerializedUser | null) => void;
  thisUserIsOwner: (ownerId: string) => boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: SerializedUser | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<SerializedUser | null>(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const thisUserIsOwner = useCallback(
    (ownerId: string) => {
      if (!user) return false;
      return user.id === ownerId;
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, setUser, thisUserIsOwner }}>
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
