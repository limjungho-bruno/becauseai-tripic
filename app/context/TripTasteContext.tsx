"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface UserPreferences {
  // Image selection data
  selectedImageRounds: number[][] // Array of 5 rounds, each containing selected image ID

  // Text input data
  textInput: string
  textInputMode: "free" | "guide"

  // Guide form data
  selectedTravelTypes: string[]
  selectedCompanion: string
  budget: number
  selectedSeasons: string[]
  selectedDislikeElements: string[]

  // Analysis results
 // Analysis results
  tags: string[]
  packages: any[]
  text_output: string[]
}

interface TripTasteContextType {
  preferences: UserPreferences
  updatePreferences: (updates: Partial<UserPreferences>) => void
  resetPreferences: () => void
}

const defaultPreferences: UserPreferences = {
  selectedImageRounds: [[], [], [], [], []],
  textInput: "",
  textInputMode: "free",
  selectedTravelTypes: [],
  selectedCompanion: "",
  budget: 150,
  selectedSeasons: [],
  selectedDislikeElements: [],
  tags: [],
  packages: [],
  text_output: []
}

const TripTasteContext = createContext<TripTasteContextType | undefined>(undefined)

export function TripTasteProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }))
  }

  const resetPreferences = () => {
    setPreferences(defaultPreferences)
  }

  return (
    <TripTasteContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </TripTasteContext.Provider>
  )
}

export function useTripTaste() {
  const context = useContext(TripTasteContext)
  if (context === undefined) {
    throw new Error("useTripTaste must be used within TripTasteProvider")
  }
  return context
}
