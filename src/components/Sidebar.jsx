import { NavLink, useLocation } from 'react-router-dom'
import {
  IconLayoutDashboard,
  IconBuilding,
  IconTrendingUp,
  IconPackage,
  IconBell,
  IconAtom,
  IconChartBar,
  IconSettings,
  IconCar,
  IconUser,
} from '@tabler/icons-react'

const NAV_ITEMS = [
  { to: '/dashboard', icon: IconLayoutDashboard, label: 'Dashboard' },
  { to: '/occupancy',  icon: IconBuilding,        label: 'Occupancy' },
  { to: '/pricing',    icon: IconTrendingUp,       label: 'Pricing' },
  { to: '/products',   icon: IconPackage,          label: 'Products' },
  { to: '/incidents',  icon: IconBell,             label: 'Incidents' },
  { to: '/simulator',  icon: IconAtom,             label: 'Simulator' },
  { to: '/reports',    icon: IconChartBar,         label: 'Reports' },
]

const BOTTOM_ITEMS = [
  { to: '/settings', icon: IconSettings, label: 'Settings' },
]

const s = {
  sidebar: {
    width: 220,
    minWidth: 220,
    height: '100vh',
    background: '#080812',
    borderRight: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  logo: {
    padding: '20px 18px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    marginBottom: 8,
  },
  logoMark: {
    width: 32,
    height: 32,
    background: '#534AB7',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  logoName: {
    fontSize: 15,
    fontWeight: 700,
    color: '#eeeef8',
    letterSpacing: '-0.2px',
    lineHeight: 1.2,
  },
  logoSub: {
    fontSize: 10,
    color: 'rgba(238,238,248,0.38)',
    fontWeight: 500,
    letterSpacing: 0.3,
  },
  nav: {
    flex: 1,
    padding: '4px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    overflowY: 'auto',
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.9,
    color: 'rgba(238,238,248,0.25)',
    padding: '10px 8px 4px',
  },
  bottom: {
    padding: '8px 10px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  user: {
    padding: '12px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: '#534AB7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  userName: { fontSize: 13, fontWeight: 600, color: '#eeeef8' },
  userRole: { fontSize: 11, color: 'rgba(238,238,248,0.38)' },
}

function NavItem({ to, icon: Icon, label, isIncidents }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'all 0.15s',
        color: isActive ? '#fff' : 'rgba(238,238,248,0.52)',
        background: isActive
          ? isIncidents
            ? 'rgba(226,75,74,0.18)'
            : 'rgba(83,74,183,0.22)'
          : 'transparent',
        borderLeft: isActive
          ? isIncidents
            ? '2px solid #E24B4A'
            : '2px solid #7c6af7'
          : '2px solid transparent',
      })}
    >
      <Icon size={17} strokeWidth={1.8} />
      {label}
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <aside style={s.sidebar}>
      {/* Logo */}
      <div style={s.logo}>
        <div style={s.logoMark}>
          <IconCar size={18} color="white" strokeWidth={1.8} />
        </div>
        <div style={s.logoText}>
          <span style={s.logoName}>NOOR</span>
          <span style={s.logoSub}>KAIA · JEDCO</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={s.nav}>
        <div style={s.sectionLabel}>Operations</div>
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavItem
            key={to}
            to={to}
            icon={icon}
            label={label}
            isIncidents={to === '/incidents'}
          />
        ))}
      </nav>

      {/* Bottom: Settings + user */}
      <div>
        <div style={{ padding: '4px 10px 4px' }}>
          {BOTTOM_ITEMS.map(({ to, icon, label }) => (
            <NavItem key={to} to={to} icon={icon} label={label} />
          ))}
        </div>
        <div style={s.user}>
          <div style={s.avatar}>
            <IconUser size={15} color="white" strokeWidth={2} />
          </div>
          <div>
            <div style={s.userName}>Ops Lead</div>
            <div style={s.userRole}>JEDCO · Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
