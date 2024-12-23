import './index.css';
import Routes from './routes/Routes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={Routes} />
    </HelmetProvider>
  </StrictMode>
);

