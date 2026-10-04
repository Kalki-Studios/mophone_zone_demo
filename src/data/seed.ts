import type { Phone, Offer, RepairItem, AccessoryCategory, ShopInfo } from './types';

export const samplePhones: Phone[] = [
  {
    id: "oppo-reno16",
    brand: "OPPO",
    model: "Reno16",
    ram: "8 GB",
    storage: "256 GB",
    condition: "new",
    price: 38999,
    status: "available",
    addedAt: "2026-09-29T10:00:00Z",
    photos: [],
    isSample: true,
  },
  {
    id: "vivo-x300-fe",
    brand: "vivo",
    model: "X300 FE",
    ram: "12 GB",
    storage: "256 GB",
    condition: "new",
    price: 54999,
    status: "available",
    addedAt: "2026-09-28T10:00:00Z",
    photos: [],
    isSample: true,
  },
  {
    id: "samsung-galaxy-a15",
    brand: "Samsung",
    model: "Galaxy A15",
    ram: "6 GB",
    storage: "128 GB",
    condition: "new",
    price: 13999,
    status: "available",
    addedAt: "2026-09-27T10:00:00Z",
    photos: [],
    isSample: true,
  },
  {
    id: "redmi-note-12",
    brand: "Redmi",
    model: "Note 12",
    ram: "6 GB",
    storage: "128 GB",
    condition: "refurbished",
    grade: "A",
    price: 9499,
    status: "available",
    addedAt: "2026-09-26T10:00:00Z",
    photos: [],
    isSample: true,
  },
  {
    id: "realme-narzo-60",
    brand: "realme",
    model: "Narzo 60",
    ram: "8 GB",
    storage: "128 GB",
    condition: "refurbished",
    grade: "A",
    price: 10999,
    status: "available",
    addedAt: "2026-09-25T10:00:00Z",
    photos: [],
    isSample: true,
  },
  {
    id: "oneplus-nord-ce3-lite",
    brand: "OnePlus",
    model: "Nord CE 3 Lite",
    ram: "8 GB",
    storage: "128 GB",
    condition: "second-hand",
    grade: "B",
    price: 11499,
    status: "available",
    addedAt: "2026-09-24T10:00:00Z",
    photos: [],
    isSample: true,
  },
  {
    id: "iphone-12",
    brand: "Apple",
    model: "iPhone 12",
    storage: "64 GB",
    condition: "second-hand",
    grade: "B",
    price: 21999,
    status: "available",
    addedAt: "2026-09-23T10:00:00Z",
    photos: [],
    isSample: true,
  },
  {
    id: "samsung-galaxy-m14",
    brand: "Samsung",
    model: "Galaxy M14",
    ram: "6 GB",
    storage: "128 GB",
    condition: "refurbished",
    grade: "B",
    price: 8299,
    status: "sold",
    addedAt: "2026-09-22T10:00:00Z",
    photos: [],
    isSample: true,
  }
];

export const sampleOffers: Offer[] = [
  {
    id: "combo-guard-lamination",
    title: "Screen guard + lamination combo",
    description: "Ask at the counter for today's combo price.",
    endsAt: "2026-10-31T23:59:59Z",
    active: true,
    isSample: true,
  },
  {
    id: "old-phone-valuation",
    title: "Old phone? Get it valued",
    description: "Bring your old phone to the shop for a valuation.",
    active: true,
    isSample: true,
  }
];

export const sampleRepairItems: RepairItem[] = [
  { id: "screen", service: "Screen replacement", priceFrom: 1200, timeNote: "Depends on model", isSample: true },
  { id: "battery", service: "Battery replacement", priceFrom: 600, timeNote: "Depends on model", isSample: true },
  { id: "charging-port", service: "Charging port", priceFrom: 350, timeNote: "Depends on model", isSample: true },
  { id: "software", service: "Software / hanging problem", priceFrom: 250, timeNote: "Depends on the issue", isSample: true },
  { id: "speaker-mic", service: "Speaker or mic", priceFrom: 300, timeNote: "Depends on model", isSample: true },
  { id: "water", service: "Water damage check", priceFrom: 200, timeNote: "Depends on the damage", isSample: true }
];

export const sampleAccessories: AccessoryCategory[] = [
  { id: "smart-watches", label: "Smart watches", note: "Ask which are in stock", priceFrom: 999, isSample: true },
  { id: "earbuds", label: "Earbuds", note: "Wireless and wired", priceFrom: 499, isSample: true },
  { id: "back-covers", label: "Back covers", note: "For most popular models", priceFrom: 99, isSample: true },
  { id: "screen-guards", label: "Screen guards", note: "Fitted at the counter", priceFrom: 99, isSample: true },
  { id: "lamination", label: "Lamination", note: "Ask for details", priceFrom: 149, isSample: true }
];

export const initialShopInfo: ShopInfo = {
  openTime: "10:00",
  closeTime: "21:00",
  openDays: [0, 1, 2, 3, 4, 5, 6],
  openDaysConfirmed: true,
  phones: { primary: "918093171718", secondary: "" },
  whatsappNumber: "918093171718",
  email: "mophonezone@gmail.com",
  instagram: { handle: "mo.phonezone", url: "https://www.instagram.com/mo.phonezone" },
  address: {
    line1: "Infront of Reliance Smart, Main Road, near Bata Showroom",
    town: "Semiliguda",
    district: "Koraput",
    state: "Odisha",
    pin: "764036"
  },
  studioCredit: "© 2026 Mo PhoneZone",
  demoMode: false
};
