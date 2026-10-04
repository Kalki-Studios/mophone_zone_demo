import React from 'react';
import './SoldStamp.css';
import { useLanguage } from '../../i18n';

export const SoldStamp = () => {
  const { t } = useLanguage();
  return (
    <div className="mz-sold-stamp">
      {t('phones.sold')}
    </div>
  );
};
