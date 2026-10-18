import { useMemo, useState } from "react";
import { addOns, bookingCleaners, bookingServices, frequencyOptions } from "@/mocks/booking";

export type BookingState = {
  serviceId: string;
  frequencyId: string;
  bedrooms: string;
  bathrooms: string;
  selectedAddOns: string[];
  date: string | null; // ISO yyyy-mm-dd
  time: string | null;
  cleanerId: string | null;
  address: { line1: string; city: string; state: string; zip: string };
  contact: { name: string; email: string; phone: string; notes: string };
};

const initialState: BookingState = {
  serviceId: "standard",
  frequencyId: "once",
  bedrooms: "2 BR",
  bathrooms: "1.5",
  selectedAddOns: [],
  date: null,
  time: null,
  cleanerId: null,
  address: { line1: "", city: "", state: "", zip: "" },
  contact: { name: "", email: "", phone: "", notes: "" },
};

export function useBooking() {
  const [state, setState] = useState<BookingState>(initialState);

  const update = <K extends keyof BookingState>(key: K, value: BookingState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const toggleAddOn = (id: string) =>
    setState((s) => ({
      ...s,
      selectedAddOns: s.selectedAddOns.includes(id)
        ? s.selectedAddOns.filter((x) => x !== id)
        : [...s.selectedAddOns, id],
    }));

  const summary = useMemo(() => {
    const service = bookingServices.find((s) => s.id === state.serviceId)!;
    const frequency = frequencyOptions.find((f) => f.id === state.frequencyId)!;
    const cleaner = bookingCleaners.find((c) => c.id === state.cleanerId) ?? null;

    // bedrooms surcharge (0/+0/+20/+40/+60/+90)
    const bedSur = ["Studio", "1 BR", "2 BR", "3 BR", "4 BR", "5+ BR"].indexOf(state.bedrooms);
    const bedroomSurcharge = [0, 0, 20, 40, 60, 90][Math.max(0, bedSur)];

    const addOnTotal = state.selectedAddOns.reduce((acc, id) => {
      const a = addOns.find((x) => x.id === id);
      return acc + (a ? a.price : 0);
    }, 0);

    const subtotal = service.basePrice + bedroomSurcharge + addOnTotal;
    const discount = Math.round(subtotal * frequency.discount);
    const total = subtotal - discount;

    const addOnLabels = state.selectedAddOns
      .map((id) => addOns.find((x) => x.id === id)?.label)
      .filter((label): label is string => Boolean(label));

    return {
      service,
      frequency,
      cleaner,
      bedroomSurcharge,
      addOnTotal,
      addOnLabels,
      subtotal,
      discount,
      total,
    };
  }, [state]);

  return { state, update, toggleAddOn, summary, reset: () => setState(initialState) };
}