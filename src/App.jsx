import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Occupancy from './pages/Occupancy'
import Pricing from './pages/Pricing'
import Products from './pages/Products'
import Incidents from './pages/Incidents'
import Simulator from './pages/Simulator'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/occupancy" element={<Occupancy />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}
