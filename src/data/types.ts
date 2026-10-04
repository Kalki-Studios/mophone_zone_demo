export type Condition = "new" | "refurbished" | "second-hand";
export type Grade = "A" | "B" | "C";

export interface Phone {
  id: string;                 // slug, unique
  brand: string;
  model: string;
  ram?: string;               // "8 GB"
  storage?: string;           // "256 GB"
  condition: Condition;
  grade?: Grade;              // only for refurbished / second-hand
  price: number;              // INR, integer
  mrp?: number;               // INR, integer
  warranty?: string;          // free text
  notes?: string;
  photos: string[];           // paths under /photos/phones/ or data URLs from admin uploads
  status: "available" | "sold";
  addedAt: string;            // ISO date
  isSample?: boolean;         // true for seed data
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  endsAt?: string;            // ISO date; offer hidden after this date
  active: boolean;
  isSample?: boolean;
}

export interface RepairItem {
  id: string;
  service: string;
  priceFrom: number;          // INR
  timeNote?: string;
  isSample?: boolean;
}

export interface AccessoryCategory {
  id: "smart-watches" | "earbuds" | "back-covers" | "screen-guards" | "lamination";
  label: string;
  note: string;
  priceFrom?: number;
  isSample?: boolean;
}

export interface ShopInfo {
  openTime: string;           // "10:00"
  closeTime: string;          // "21:30"
  openDays: number[];         // 0 = Sunday ... 6 = Saturday
  openDaysConfirmed: boolean; // false until owner confirms
  notice?: string;            // optional banner text, e.g. holiday closure
  phones: { primary: string; secondary: string; };
  whatsappNumber: string;
  email: string;
  instagram: { handle: string; url: string; };
  address: {
    line1: string;
    town: string;
    district: string;
    state: string;
    pin: string;
  };
  studioCredit: string;
  demoMode: boolean;
}
