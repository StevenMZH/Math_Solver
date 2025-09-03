import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/normalize.css'
import './index.css'
import './App.css'
import App from './App.jsx'
import { AppProviders } from './AppProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
