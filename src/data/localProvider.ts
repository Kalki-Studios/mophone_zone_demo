import { get, set, clear } from 'idb-keyval';
import type { DataProvider } from './provider';
import type { Phone, Offer, RepairItem, AccessoryCategory, ShopInfo } from './types';
import { samplePhones, sampleOffers, sampleRepairItems, sampleAccessories, initialShopInfo } from './seed';

const KEYS = {
  PHONES: 'mz_phones',
  OFFERS: 'mz_offers',
  REPAIR: 'mz_repair',
  ACCESSORIES: 'mz_accessories',
  SHOP_INFO: 'mz_shop_info',
  INITIALIZED: 'mz_initialized_v2', // bumped version to force refresh
};

export const localProvider: DataProvider = {
  async getPhones(): Promise<Phone[]> {
    await ensureInitialized();
    return (await get<Phone[]>(KEYS.PHONES)) || [];
  },
  async getPhone(id: string): Promise<Phone | undefined> {
    const phones = await this.getPhones();
    return phones.find(p => p.id === id);
  },
  async addPhone(phone: Phone): Promise<void> {
    const phones = await this.getPhones();
    phones.push(phone);
    await set(KEYS.PHONES, phones);
  },
  async updatePhone(phone: Phone): Promise<void> {
    const phones = await this.getPhones();
    const index = phones.findIndex(p => p.id === phone.id);
    if (index >= 0) {
      phones[index] = phone;
      await set(KEYS.PHONES, phones);
    }
  },
  async deletePhone(id: string): Promise<void> {
    const phones = await this.getPhones();
    await set(KEYS.PHONES, phones.filter(p => p.id !== id));
  },

  async getOffers(): Promise<Offer[]> {
    await ensureInitialized();
    return (await get<Offer[]>(KEYS.OFFERS)) || [];
  },
  async addOffer(offer: Offer): Promise<void> {
    const offers = await this.getOffers();
    offers.push(offer);
    await set(KEYS.OFFERS, offers);
  },
  async updateOffer(offer: Offer): Promise<void> {
    const offers = await this.getOffers();
    const index = offers.findIndex(o => o.id === offer.id);
    if (index >= 0) {
      offers[index] = offer;
      await set(KEYS.OFFERS, offers);
    }
  },
  async deleteOffer(id: string): Promise<void> {
    const offers = await this.getOffers();
    await set(KEYS.OFFERS, offers.filter(o => o.id !== id));
  },

  async getRepairItems(): Promise<RepairItem[]> {
    await ensureInitialized();
    return (await get<RepairItem[]>(KEYS.REPAIR)) || [];
  },
  async addRepairItem(item: RepairItem): Promise<void> {
    const items = await this.getRepairItems();
    items.push(item);
    await set(KEYS.REPAIR, items);
  },
  async updateRepairItem(item: RepairItem): Promise<void> {
    const items = await this.getRepairItems();
    const index = items.findIndex(i => i.id === item.id);
    if (index >= 0) {
      items[index] = item;
      await set(KEYS.REPAIR, items);
    }
  },
  async deleteRepairItem(id: string): Promise<void> {
    const items = await this.getRepairItems();
    await set(KEYS.REPAIR, items.filter(i => i.id !== id));
  },

  async getAccessories(): Promise<AccessoryCategory[]> {
    await ensureInitialized();
    return (await get<AccessoryCategory[]>(KEYS.ACCESSORIES)) || [];
  },
  async updateAccessory(item: AccessoryCategory): Promise<void> {
    const items = await this.getAccessories();
    const index = items.findIndex(i => i.id === item.id);
    if (index >= 0) {
      items[index] = item;
      await set(KEYS.ACCESSORIES, items);
    }
  },

  async getShopInfo(): Promise<ShopInfo> {
    await ensureInitialized();
    const data = (await get<ShopInfo>(KEYS.SHOP_INFO)) || initialShopInfo;
    
    // Provide fallbacks for older cached data
    if (!data.phones) data.phones = initialShopInfo.phones;
    if (!data.address) data.address = initialShopInfo.address;
    if (!data.instagram) data.instagram = initialShopInfo.instagram;
    if (!data.facebook) data.facebook = initialShopInfo.facebook;
    
    return data;
  },
  async updateShopInfo(info: ShopInfo): Promise<void> {
    await set(KEYS.SHOP_INFO, info);
  },

  async exportData(): Promise<string> {
    await ensureInitialized();
    const data = {
      phones: await get(KEYS.PHONES),
      offers: await get(KEYS.OFFERS),
      repair: await get(KEYS.REPAIR),
      accessories: await get(KEYS.ACCESSORIES),
      shopInfo: await get(KEYS.SHOP_INFO),
    };
    return JSON.stringify(data, null, 2);
  },
  async importData(json: string): Promise<void> {
    const data = JSON.parse(json);
    if (data.phones) await set(KEYS.PHONES, data.phones);
    if (data.offers) await set(KEYS.OFFERS, data.offers);
    if (data.repair) await set(KEYS.REPAIR, data.repair);
    if (data.accessories) await set(KEYS.ACCESSORIES, data.accessories);
    if (data.shopInfo) await set(KEYS.SHOP_INFO, data.shopInfo);
  },
  async resetToSampleData(): Promise<void> {
    await clear();
    await set(KEYS.INITIALIZED, true);
    await set(KEYS.PHONES, samplePhones);
    await set(KEYS.OFFERS, sampleOffers);
    await set(KEYS.REPAIR, sampleRepairItems);
    await set(KEYS.ACCESSORIES, sampleAccessories);
    await set(KEYS.SHOP_INFO, initialShopInfo);
  }
};

async function ensureInitialized() {
  const initialized = await get<boolean>(KEYS.INITIALIZED);
  if (!initialized) {
    await localProvider.resetToSampleData();
  }
}
