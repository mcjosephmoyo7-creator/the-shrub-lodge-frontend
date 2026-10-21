export type TransferItem = {
  name: string;
  price: number;
};

export type TransferGroup = {
  title: string;
  items: TransferItem[];
};

export const transfers = {
  title: "Transfers & Logistics",
  description:
    "Seamless airport transfers and transport services to ensure a smooth, stress-free travel experience from arrival to departure.",
  groups: [
    {
      title: "Airport Transfers",
      items: [
        { name: "Kazungula Boarder", price: 50 },
        { name: "Zimbabwean Boarder", price: 3 },
        { name: "Vic Falls Airport", price: 15 },
        { name: "Livingstone Airport", price: 40 },
        { name: "Kasane Airport", price: 60 },
      ],
    },
    {
      title: "Local Transfers",
      items: [
        { name: "Boma", price: 5 },
        { name: "Victoria Falls Town", price: 5 },
        { name: "Out of Town (the falls)", price: 10 },
      ],
    },
  ],
} satisfies {
  title: string;
  description: string;
  groups: TransferGroup[];
};
