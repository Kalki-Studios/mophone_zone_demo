import React, { createContext, useContext, useEffect, useState } from 'react';
import type { DataProvider } from './provider';
import { localProvider } from './localProvider';
import type { Phone, Offer, RepairItem, AccessoryCategory, ShopInfo } from './types';
import { initialShopInfo } from './seed';
import { PremiumLoader } from '../components/PremiumLoader/PremiumLoader';

interface DataContextType {
  provider: DataProvider;
  phones: Phone[];
  offers: Offer[];
  repairItems: RepairItem[];
  accessories: AccessoryCategory[];
  shopInfo: ShopInfo;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [repairItems, setRepairItems] = useState<RepairItem[]>([]);
  const [accessories, setAccessories] = useState<AccessoryCategory[]>([]);
  const [shopInfo, setShopInfo] = useState<ShopInfo>(initialShopInfo);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = async () => {
    setIsLoading(true);
    const startTime = Date.now();
    try {
      const [p, o, r, a, s] = await Promise.all([
        localProvider.getPhones(),
        localProvider.getOffers(),
        localProvider.getRepairItems(),
        localProvider.getAccessories(),
        localProvider.getShopInfo(),
      ]);
      setPhones(p);
      setOffers(o);
      setRepairItems(r);
      setAccessories(a);
      setShopInfo(s);

    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      // Ensure the premium loader shows for a short time
      const elapsedTime = Date.now() - startTime;
      const minLoaderTime = 1000; // Time in milliseconds (e.g. 500 = 0.5 seconds)
      if (elapsedTime < minLoaderTime) {
        await new Promise(resolve => setTimeout(resolve, minLoaderTime - elapsedTime));
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DataContext.Provider value={{
      provider: localProvider,
      phones,
      offers,
      repairItems,
      accessories,
      shopInfo,
      refreshData,
      isLoading
    }}>
      <PremiumLoader isLoading={isLoading} />
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProviderWrapper');
  }
  return context;
};
