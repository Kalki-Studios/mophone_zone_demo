import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/PublicLayout/PublicLayout';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Phones = React.lazy(() => import('./pages/Phones/Phones'));
const PhoneDetail = React.lazy(() => import('./pages/PhoneDetail/PhoneDetail'));
const Repair = React.lazy(() => import('./pages/Repair/Repair'));
const Accessories = React.lazy(() => import('./pages/Accessories/Accessories'));
const AdminLayout = React.lazy(() => import('./pages/admin/Layout'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/phones/:id" element={<PhoneDetail />} />
            <Route path="/repair" element={<Repair />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="*" element={<div style={{ padding: '20px' }}>Not Found</div>} />
          </Route>
          
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
