"use client";

import React, { useContext, createContext, useState } from "react";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  access_token: string;
  refresh_token: string;
  isAuth: boolean;
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
  const [access_token, setAccessToken] = useState<string>("");
  const [refresh_token, setRefreshToken] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

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
        throw new Error(errorData.errors || "Login failed");
      }

      const data = await res.json();

      setAccessToken(data.token);
      setRefreshToken("");
      setIsAuth(true);
      setUser(data.userId);
    } catch (error) {
      console.log(error);
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

      setAccessToken("");
      setRefreshToken("");
      setIsAuth(false);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        access_token,
        refresh_token,
        isAuth,
        user,
        isLoaded,
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
