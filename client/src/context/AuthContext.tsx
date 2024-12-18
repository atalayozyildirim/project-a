"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuth: boolean;
  redirectTo: boolean;
  error: string;
  user: {
    email: string;
  } | null;
  isLoaded: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [redirectTo, setRedirectTo] = useState<boolean>(false);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setIsLoaded(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.errors);
        throw new Error(errorData || "Login failed");
      }

      const data = await res.json();

      setIsAuth(true);
      setUser(data.user);
      setIsLoaded(false);
      setRedirectTo(true);
      router.push("/home");
    } catch (error) {
      console.log(error);
      setIsLoaded(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.errors || "Logout failed");
      }

      const data = await res.json();

      console.log("OK", data);
      setIsAuth(false);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok && window.location.pathname !== "/") {
        router.push("/");
        throw new Error(data.errors || "Not authenticated");
      }
    } catch (error) {
      console.log("Not Authenticated", error);
    }
  };

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      window.location.pathname !== "/" && checkAuth();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuth,
        user,
        isLoaded,
        redirectTo,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
