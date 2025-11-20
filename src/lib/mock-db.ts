
// This file simulates a shared database state for demonstration purposes.
// In a real application, this would be replaced by a proper database like Firestore.

const createSharedState = () => {
  let listeners: ((data: any) => void)[] = [];
  let state = {
    clients: [
      { id: 'user-123', name: "Alex & Jordan", date: "2025-06-14", package: "Premium Romance", status: "Booked" },
      { id: 'user-456', name: "Michael & David", date: "2025-08-05", package: "Luxury Dream", status: "Booked" },
      { id: 'user-789', name: "Emily & James", date: "2025-09-01", package: "Premium Romance", status: "Inquiry" },
    ],
    contracts: [
      { client: "Alex & Jordan", document: "Main Venue Agreement", status: "Awaiting Signature", dateSent: "May 20, 2024" },
      { client: "Alex & Jordan", document: "Catering Addendum", status: "Completed", dateSent: "May 15, 2024"},
      { client: "Michael & David", document: "Main Venue Agreement", status: "Completed", dateSent: "May 15, 2024" },
    ],
    accommodations: [
        { id: 1, client: "Alex & Jordan", room: "Les Heures du Jour", checkIn: "2025-06-13", checkOut: "2025-06-15", status: "Confirmed" },
        { id: 2, client: "Alex & Jordan", room: "Ruines Antiques", checkIn: "2025-06-13", checkOut: "2025-06-15", status: "Confirmed" },
        { id: 3, client: "Michael & David", room: "La Loge", checkIn: "2025-08-04", checkOut: "2025-08-06", status: "Pending" },
    ],
    packages: [
        { id: "classic", name: "Classic Elegance", priceHigh: 18000, priceLow: 15000 },
        { id: "premium", name: "Premium Romance", priceHigh: 28000, priceLow: 25000 },
        { id: "luxury", name: "Luxury Dream", priceHigh: 45000, priceLow: 40000 },
    ],
    messages: [
        { id: 1, client: "Alex & Jordan", sender: "Client", text: "Bonjour, est-il possible de visiter le domaine la semaine prochaine ?" },
        { id: 2, client: "Alex & Jordan", sender: "Admin", text: "Bien sûr ! Seriez-vous disponible mardi à 14h ?" },
        { id: 3, client: "Emily & James", sender: "Client", text: "Nous aimerions avoir des informations sur les options de traiteur." }
    ]
  };

  return {
    getState: () => state,
    setState: (newState: Partial<typeof state>) => {
      state = { ...state, ...newState };
      listeners.forEach(listener => listener(state));
    },
    subscribe: (listener: (data: any) => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    }
  };
};

export const sharedState = createSharedState();

    