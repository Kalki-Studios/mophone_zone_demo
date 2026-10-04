import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { StickyMobileBar } from '../StickyMobileBar/StickyMobileBar';
import { OfferTicker } from '../OfferTicker/OfferTicker';

export const PublicLayout = () => {
  return (
    <>
      <Header />
      <OfferTicker />
      <main>
        <Outlet />
      </main>
      <Footer />
      <StickyMobileBar />
    </>
  );
};
