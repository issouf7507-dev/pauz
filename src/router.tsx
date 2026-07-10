import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import CommanderPage from './pages/CommanderPage'
import MerciPage from './pages/MerciPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/scan/:code', element: <ScanPage /> },
  { path: '/commander', element: <CommanderPage /> },
  { path: '/merci', element: <MerciPage /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '*', element: <NotFoundPage /> },
])
