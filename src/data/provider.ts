import type { Phone, Offer, RepairItem, AccessoryCategory, ShopInfo } from './types';

export interface DataProvider {
  // Phones
  getPhones(): Promise<Phone[]>;
  getPhone(id: string): Promise<Phone | undefined>;
  addPhone(phone: Phone): Promise<void>;
  updatePhone(phone: Phone): Promise<void>;
  deletePhone(id: string): Promise<void>;

  // Offers
  getOffers(): Promise<Offer[]>;
  addOffer(offer: Offer): Promise<void>;
  updateOffer(offer: Offer): Promise<void>;
  deleteOffer(id: string): Promise<void>;

  // Repair
  getRepairItems(): Promise<RepairItem[]>;
  addRepairItem(item: RepairItem): Promise<void>;
  updateRepairItem(item: RepairItem): Promise<void>;
  deleteRepairItem(id: string): Promise<void>;

  // Accessories
  getAccessories(): Promise<AccessoryCategory[]>;
  updateAccessory(item: AccessoryCategory): Promise<void>;

  // Shop Info
  getShopInfo(): Promise<ShopInfo>;
  updateShopInfo(info: ShopInfo): Promise<void>;

  // System
  exportData(): Promise<string>;
  importData(json: string): Promise<void>;
  resetToSampleData(): Promise<void>;
}
