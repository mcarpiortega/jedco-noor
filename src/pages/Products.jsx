import { useState } from 'react'
import {
  IconAtom, IconTrendingUp, IconCalendar, IconRepeat,
  IconCrown, IconCar, IconBuilding2, IconArrowUpRight,
  IconChevronRight,
} from '@tabler/icons-react'

const PRODUCTS = [
  {
    id: 'dynamic',
    icon: IconTrendingUp,
    name: 'Dynamic Pricing',
    desc: 'Real-time demand-based rate adjustment across all zones via NOOR engine.',
    status: 'LIVE',
    revenue: '182K SAR/day',
    revPct: 38,
    color: '#7c6af7',
  },
  {
    id: 'prebooking',
    icon: IconCalendar,
    name: 'Pre-booking & Reservations',
    desc: 'Guaranteed space allocation via web, app, or airline integration.',
    status: 'LIVE',
    revenue: '124K SAR/day',
    revPct: 27,
    color: '#6aadff',
  },
  {
    id: 'subscriptions',
    icon: IconRepeat,
    name: 'Subscription Plans',
    desc: 'Monthly / annual commuter passes for frequent travellers and staff.',
    status: 'LIVE',
    revenue: '91K SAR/day',
    revPct: 20,
    color: '#34c995',
  },
  {
    id: 'valet',
    icon: IconCrown,
    name: 'Valet & Premium',
    desc: 'Concierge parking, chauffeur drop-off, and lounge access bundling.',
    status: 'BETA',
    revenue: '41K SAR/day',
    revPct: 9,
    color: '#f0b840',
  },
  {
    id: 'rental',
    icon: IconCar,
    name: 'Rental Car & Fleet Hub',
    desc: 'Dedicated zones + inventory API for Hertz, Budget, SIXT, and local fleets.',
    status: 'BETA',
    revenue: '18K SAR/day',
    revPct: 4,
    color: '#ff9966',
  },
  {
    id: 'b2b',
    icon: IconBuilding2,
    name: 'Corporate B2B Packages',
    desc: 'Volume contracts and invoicing for airline crews, cargo operators, and corporates.',
    status: 'BETA',
    revenue: '9K SAR/day',
    revPct: 2,
    color: '#a094ff',
  },
]

const TABS = ['Overview', 'Bookings', 'Subscriptions', 'Valet', 'B2B']

const BOOKINGS_DATA = [
  { id: 'BK-44821', zone: 'Private',   entry: '14:30', exit: '17:00', vehicle: 'SAR-1942', status: 'Confirmed', amount: '45 SAR' },
  { id: 'BK-44820', zone: 'Business',  entry: '13:00', exit: '15:30', vehicle: 'RYD-3381', status: 'Active',    amount: '72 SAR' },
  { id: 'BK-44819', zone: 'VIP',       entry: '12:45', exit: '16:00', vehicle: 'JED-0021', status: 'Active',    amount: '156 SAR'},
  { id: 'BK-44818', zone: 'Long Stay', entry: '08:00', exit: '18:00', vehicle: 'MKH-7712', status: 'Active',    amount: '94 SAR' },
  { id: 'BK-44817', zone: 'Private',   entry: '16:00', exit: '20:00', vehicle: 'RYD-5521', status: 'Upcoming',  amount: '52 SAR' },
]

const SUBS_DATA = [
  { plan: 'Monthly Private', holder: 'Ahmed Al-Rashid',  expires: '31 Jul 2025', zone: 'Private',  status: 'Active',   fee: '850 SAR/mo' },
  { plan: 'Annual Long Stay',holder: 'Sara Al-Mutairi',  expires: '15 Dec 2025', zone: 'Long Stay',status: 'Active',   fee: '7,200 SAR/yr'},
  { plan: 'Monthly Business',holder: 'Khalid Bin Omar',  expires: '28 Jun 2025', zone: 'Business', status: 'Expiring', fee: '1,200 SAR/mo'},
  { plan: 'Monthly Private', holder: 'Fatima Al-Zahrani',expires: '10 Aug 2025', zone: 'Private',  status: 'Active',   fee: '850 SAR/mo' },
]

function StatusBadge({ s }) {
  const map = {
    Confirmed: 'badge-blue', Active: 'badge-ok', Upcoming: 'badge-purple',
    Expiring: 'badge-warning', 'LIVE': null, 'BETA': null,
  }
  return <span className={`badge ${map[s] || 'badge-muted'}`}>{s}</span>
}

export default function Products() {
  const [tab, setTab] = useState('Overview')

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Products</div>
          <div className="page-subtitle">6 parking products · 3 live · 3 beta</div>
        </div>
        <span className="badge badge-purple">
          <IconAtom size={11} />
          NOOR Revenue Engine
        </span>
      </div>

      {/* Tab row */}
      <div className="tab-row">
        {TABS.map(t => (
          <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === 'Overview' && (
        <>
          {/* Product cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
            {PRODUCTS.map(p => {
              const Icon = p.icon
              const isLive = p.status === 'LIVE'
              return (
                <div key={p.id} className="card" style={{ opacity: isLive ? 1 : 0.65, cursor: 'pointer' }}
                  onClick={() => { if (p.id === 'prebooking') setTab('Bookings'); else if (p.id === 'subscriptions') setTab('Subscriptions'); else if (p.id === 'valet') setTab('Valet'); else if (p.id === 'b2b') setTab('B2B') }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: `${p.color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color={p.color} strokeWidth={1.8} />
                    </div>
                    <span className={`badge ${isLive ? 'badge-ok' : 'badge-warning'}`}>
                      {p.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.revenue}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{p.revPct}% share</div>
                  </div>
                  {/* Revenue share mini bar */}
                  <div className="progress-track" style={{ marginTop: 8, marginBottom: 0 }}>
                    <div className="progress-fill" style={{ width: `${p.revPct * 2.5}%`, background: p.color }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* NOOR strip */}
          <div className="noor-strip">
            <div className="noor-strip-icon"><IconAtom size={16} strokeWidth={1.8} /></div>
            <div className="noor-strip-body">
              <div className="noor-strip-title">NOOR Opportunity — B2B Pipeline</div>
              <div className="noor-strip-text">4 airline ground crew operators identified as high-probability B2B targets. Estimated pipeline value: <strong style={{ color: 'var(--purple-text)' }}>+28,000 SAR/month</strong>. Go to B2B tab to review contracts.</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setTab('B2B')}>
              <IconChevronRight size={13} strokeWidth={2} />
              Review
            </button>
          </div>
        </>
      )}

      {/* ── BOOKINGS ── */}
      {tab === 'Bookings' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Active Reservations</div>
            <span className="badge badge-ok">3,421 total</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th><th>Zone</th><th>Entry</th><th>Exit</th><th>Vehicle</th><th>Status</th><th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS_DATA.map(b => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 700, color: 'var(--purple-text)', fontFamily: 'monospace', fontSize: 12 }}>{b.id}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{b.zone}</td>
                  <td>{b.entry}</td>
                  <td>{b.exit}</td>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 12 }}>{b.vehicle}</td>
                  <td><StatusBadge s={b.status} /></td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── SUBSCRIPTIONS ── */}
      {tab === 'Subscriptions' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Active Subscription Plans</div>
            <span className="badge badge-purple">4,812 subscribers</span>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Plan</th><th>Holder</th><th>Zone</th><th>Expires</th><th>Status</th><th style={{ textAlign: 'right' }}>Fee</th></tr>
            </thead>
            <tbody>
              {SUBS_DATA.map((s, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{s.plan}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.holder}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.zone}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{s.expires}</td>
                  <td><StatusBadge s={s.status} /></td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>{s.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── VALET ── */}
      {tab === 'Valet' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card">
            <div className="section-title">Valet Operations · Live</div>
            {[
              { label: 'Cars under valet care', value: '47', color: '#f0b840' },
              { label: 'Avg retrieval time',    value: '8.2 min', color: '#34c995' },
              { label: 'Staff on duty',         value: '12', color: 'var(--text-primary)' },
              { label: 'Revenue today',         value: '41K SAR', color: '#f0b840' },
            ].map(k => (
              <div key={k.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{k.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: k.color }}>{k.value}</div>
              </div>
            ))}
          </div>
          <div className="noor-strip" style={{ alignSelf: 'start' }}>
            <div className="noor-strip-icon"><IconAtom size={16} strokeWidth={1.8} /></div>
            <div className="noor-strip-body">
              <div className="noor-strip-title">NOOR — Valet Forecast</div>
              <div className="noor-strip-text">Peak valet demand expected 16:00–18:00 based on EK-813 arrival cluster. Recommend pre-positioning 4 additional valets at Terminal 1 kerbside.</div>
            </div>
          </div>
        </div>
      )}

      {/* ── B2B ── */}
      {tab === 'B2B' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="section-title">Corporate Accounts</div>
            {[
              { name: 'Saudia Airlines Ground Ops', spaces: 120, monthly: '62,400 SAR', status: 'Active'    },
              { name: 'DHL Express KSA',            spaces: 45,  monthly: '23,400 SAR', status: 'Active'    },
              { name: 'Hertz Fleet Management',     spaces: 80,  monthly: '41,600 SAR', status: 'Active'    },
              { name: 'Flyadeal Ground Crew',        spaces: 60,  monthly: '31,200 SAR', status: 'Negotiating'},
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{c.spaces} reserved spaces</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#6aadff' }}>{c.monthly}</div>
                <StatusBadge s={c.status} />
              </div>
            ))}
          </div>
          <div className="noor-strip">
            <div className="noor-strip-icon"><IconAtom size={16} strokeWidth={1.8} /></div>
            <div className="noor-strip-body">
              <div className="noor-strip-title">NOOR Pipeline Opportunity</div>
              <div className="noor-strip-text">4 operators identified: Flyadeal, AECOM, Aramco Logistics, Air Arabia. Combined estimated value: <strong style={{ color: 'var(--purple-text)' }}>28,000 SAR/month</strong>. Initiate outreach?</div>
            </div>
            <button className="btn btn-primary btn-sm">
              <IconArrowUpRight size={13} strokeWidth={2} />
              Initiate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
