"use client";

import React, { createContext, useContext } from "react";

export type UserRole = "USER" | "ADMIN";
export type Domain = "SE" | "ML" | "AI";

export type User = {
  id: string;
  name: string;
  email: string;
  selectedDomain: Domain;
  currentDay: number;
  currentStreak: number;
  longestStreak: number;
  joinedAt: string;
  role: UserRole;
} | null;

const UserContext = createContext<User>(null);

export function UserProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useIsAdmin() {
  const user = useUser();
  return user?.role === "ADMIN";
}
