import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // Removed because file does not exist
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
