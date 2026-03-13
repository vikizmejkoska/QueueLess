import { create } from 'zustand';

const useTicketStore = create((set) => ({
  selectedSalon: null,
  selectedService: null,
  currentTicket: null,

  setSelectedSalon: (salon) => set({ selectedSalon: salon }),
  setSelectedService: (service) => set({ selectedService: service }),
  setCurrentTicket: (ticket) => set({ currentTicket: ticket }),

  clearFlow: () =>
    set({
      selectedSalon: null,
      selectedService: null,
      currentTicket: null,
    }),
}));

export default useTicketStore;