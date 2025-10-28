"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BookingDates {
  from: Date;
  to: Date;
}

interface BookingContextType {
  dates: BookingDates | null;
  setDates: (dates: BookingDates | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [dates, setDates] = useState<BookingDates | null>(null);

  return (
    <BookingContext.Provider value={{ dates, setDates }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
