import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BuscadorPeliculas } from './BuscadorPeliculas';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/movieSearch.css';
import { ToastProvider } from './context/ToastProvider';
import { BackgroundImageProvider } from './context/BackgroundImageProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <BackgroundImageProvider>
        <BuscadorPeliculas />
      </BackgroundImageProvider>
    </ToastProvider>
  </StrictMode>
)
