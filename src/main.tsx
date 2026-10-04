import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/tokens.css';
import './styles/base.css';
import { DataProviderWrapper } from './data/DataContext.tsx';

import { ErrorBoundary } from './ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <DataProviderWrapper>
        <App />
      </DataProviderWrapper>
    </ErrorBoundary>
  </React.StrictMode>,
);
