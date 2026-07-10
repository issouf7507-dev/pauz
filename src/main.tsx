import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import Preloader from './components/layout/Preloader'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preloader />
    <RouterProvider router={router} />
  </StrictMode>,
)
