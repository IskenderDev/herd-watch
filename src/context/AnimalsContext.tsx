import React, { createContext, useContext } from "react";
import { useAnimals } from "@/hooks/useAnimals";

type AnimalsContextType = ReturnType<typeof useAnimals>;

const AnimalsContext = createContext<AnimalsContextType | null>(null);

export function AnimalsProvider({ children }: { children: React.ReactNode }) {
  const animals = useAnimals();
  return (
    <AnimalsContext.Provider value={animals}>{children}</AnimalsContext.Provider>
  );
}

export function useAnimalsContext() {
  const ctx = useContext(AnimalsContext);
  if (!ctx) throw new Error("useAnimalsContext must be used within AnimalsProvider");
  return ctx;
}
