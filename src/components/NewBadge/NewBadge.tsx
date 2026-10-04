import React from 'react';
import './NewBadge.css';
import { useLanguage } from '../../i18n';

export const NewBadge = () => {
  const { t } = useLanguage();
  return (
    <div className="mz-new-badge">
      {t('phones.new.badge')}
    </div>
  );
};
