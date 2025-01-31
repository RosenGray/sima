"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/auth/auth.types";

import { ServerErrorType } from "@sima-board/common";
import { customFetch } from "@/fetch/client";
import Loader from "@/components/Loader/Loader";
import LoaderContainer from "@/components/Loader/LoaderContainer";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

const fetchUser = async () => {
  try {
    const res = await customFetch<{ currentUser: User }, ServerErrorType>(
      "api/auth/currentuser"
    );
    const data = await res.json();
    if (res.ok) {
      return data as { currentUser: User };
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(!initialUser);


  useEffect(() => {
    if (!initialUser) {
      fetchUser().then((data) => {
        setUser(data?.currentUser || null);
        setIsLoading(false);
      });
    }
  }, [initialUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {isLoading ? (
        <LoaderContainer width="100vw" height="100vh">
          <Loader isSpin />
        </LoaderContainer>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}