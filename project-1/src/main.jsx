import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

import { RechartsDevtools } from "@recharts/devtools";

import 'primereact/resources/themes/saga-blue/theme.css';  // theme
import 'primereact/resources/primereact.min.css';           // core css
import 'primeicons/primeicons.css';                         // icons
import 'primeflex/primeflex.css';                           // optional utility CSS


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
