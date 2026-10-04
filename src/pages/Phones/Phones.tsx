import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Phones.css';
import { useData } from '../../data/DataContext';
import { useLanguage } from '../../i18n';
import { PriceTagCard } from '../../components/PriceTagCard/PriceTagCard';
import { FilterChips } from '../../components/FilterChips/FilterChips';
import { buildWhatsappLink } from '../../lib/whatsapp';

export default function Phones() {
  const { phones, shopInfo } = useData();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL params
  const condition = searchParams.get('condition') || 'all';
  const brand = searchParams.get('brand') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const hideSold = searchParams.get('hideSold') === '1';

  // Extract unique brands for filter
  const brands = useMemo(() => {
    const b = new Set(phones.map(p => p.brand));
    return Array.from(b).sort((a, b) => a.localeCompare(b));
  }, [phones]);

  // Apply filters and sort
  const filteredPhones = useMemo(() => {
    let result = [...phones];

    if (hideSold) {
      result = result.filter(p => p.status !== 'sold');
    }

    if (condition !== 'all') {
      result = result.filter(p => p.condition === condition);
    }

    if (brand !== 'all') {
      result = result.filter(p => p.brand === brand);
    }

    result.sort((a, b) => {
      // Sort sold to the end if not hidden
      if (!hideSold) {
        if (a.status === 'sold' && b.status !== 'sold') return 1;
        if (a.status !== 'sold' && b.status === 'sold') return -1;
      }

      if (sort === 'price-asc') {
        return a.price - b.price;
      }
      if (sort === 'price-desc') {
        return b.price - a.price;
      }
      // default: newest
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    });

    return result;
  }, [phones, condition, brand, sort, hideSold]);

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all' || value === 'newest' || value === '0') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const conditionOptions = [
    { value: 'all', label: t('phones.all') },
    { value: 'new', label: t('phones.new') },
    { value: 'refurbished', label: t('phones.refurbished') },
    { value: 'second-hand', label: t('phones.secondHand') },
  ];

  const brandOptions = [
    { value: 'all', label: t('phones.all') },
    ...brands.map(b => ({ value: b, label: b }))
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
  ];

  return (
    <div className="mz-page mz-phones-page">
      <div className="mz-container">
        <h1 className="mz-phones-title">{t('phones.pageTitle')}</h1>

        <div className="mz-filters-bar">
          <div className="mz-filter-group">
            <span className="mz-filter-label">Condition:</span>
            <FilterChips 
              options={conditionOptions}
              activeValue={condition}
              onChange={(val) => updateParam('condition', val)}
            />
          </div>
          
          <div className="mz-filter-group">
            <span className="mz-filter-label">Brand:</span>
            <FilterChips 
              options={brandOptions}
              activeValue={brand}
              onChange={(val) => updateParam('brand', val)}
            />
          </div>

          <div className="mz-filter-group mz-filter-group-controls">
            <div className="mz-select-wrapper">
              <span className="mz-filter-label">Sort:</span>
              <select 
                value={sort} 
                onChange={(e) => updateParam('sort', e.target.value)}
                className="mz-select"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            
            <label className="mz-checkbox-label">
              <input 
                type="checkbox" 
                checked={hideSold} 
                onChange={(e) => updateParam('hideSold', e.target.checked ? '1' : '0')}
              />
              {t('phones.hideSold')}
            </label>
          </div>
        </div>

        <div className="mz-results-count">
          {t('phones.count').replace('{n}', filteredPhones.length.toString())}
        </div>

        {filteredPhones.length > 0 ? (
          <div className="mz-phone-grid">
            {filteredPhones.map(phone => (
              <PriceTagCard key={phone.id} phone={phone} />
            ))}
          </div>
        ) : (
          <div className="mz-empty-state">
            <p>{t('phones.empty')}</p>
            <a
              href={buildWhatsappLink(shopInfo.whatsappNumber, "Hello Mo PhoneZone, what phones do you have in stock right now?")}
              className="mz-samsung-btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Ask on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
