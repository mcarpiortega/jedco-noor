import {
  IconBuilding, IconTrendingUp, IconBell, IconCar,
  IconArrowUpRight, IconArrowDownRight, IconAtom,
  IconCircleCheck, IconAlertTriangle, IconClock,
} from '@tabler/icons-react'

const kpis = [
  { label: 'Total Spaces',    value: '21,367', sub: 'KAIA complex',       color: '#7c6af7' },
  { label: 'Occupied Now',    value: '15,284', sub: '71.5% utilisation',  color: '#7c6af7' },
  { label: 'Available',       value: '6,083',  sub: 'across all zones',   color: '#34c995' },
  { label: 'Revenue Today',   value: '182K',   sub: 'SAR · live',         color: '#34c995' },
  { label: 'Active Bookings', value: '3,421',  sub: 'pre-paid confirmed', color: '#6aadff' },
  { label: 'Open Incidents',  value: '23',     sub: '2 critical',         color: '#ff7b7a' },
]

const zones = [
  { name: 'Private',   pct: 76, spaces: 6840, status: 'ok' },
  { name: 'Long Stay', pct: 92, spaces: 5120, status: 'critical' },
  { name: 'Staff',     pct: 61, spaces: 4200, status: 'ok' },
  { name: 'Rental',    pct: 45, spaces: 2100, status: 'ok' },
  { name: 'Business',  pct: 88, spaces: 2307, status: 'warning' },
  { name: 'VIP',       pct: 63, spaces: 800,  status: 'ok' },
]

const statusColor = { ok: '#34c995', warning: '#f0b840', critical: '#ff7b7a' }
const statusBg    = { ok: 'rgba(29,158,117,0.13)', warning: 'rgba(212,143,26,0.13)', critical: 'rgba(226,75,74,0.13)' }

const recentEvents = [
  { icon: IconAlertTriangle, color: '#ff7b7a', text: 'Long Stay approaching 100% capacity', time: '2 min ago' },
  { icon: IconTrendingUp,    color: '#7c6af7',  text: 'Dynamic pricing surge ×2.1 activated — Long Stay', time: '8 min ago' },
  { icon: IconCircleCheck,   color: '#34c995', text: 'Gate LG-07 barrier fault resolved', time: '14 min ago' },
  { icon: IconClock,         color: '#6aadff', text: 'Flight wave EK-813 expected +1,200 arrivals in 40 min', time: '17 min ago' },
  { icon: IconCircleCheck,   color: '#34c995', text: 'Pre-booking batch #4821 processed — 312 spaces reserved', time: '31 min ago' },
]

function ZoneBar({ name, pct, spaces, status }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ width: 80, fontSize: 12, fontWeight: 600, color: 'rgba(238,238,248,0.7)' }}>{name}</div>
      <div style={{ flex: 1 }}>
        <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: statusColor[status], borderRadius: 99 }} />
        </div>
      </div>
      <div style={{ width: 36, textAlign: 'right', fontSize: 13, fontWeight: 700, color: statusColor[status] }}>{pct}%</div>
      <div style={{
        padding: '2px 8px',
        borderRadius: 99,
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        background: statusBg[status],
        color: statusColor[status],
        width: 60,
        textAlign: 'center',
      }}>
        {status === 'ok' ? 'OK' : status === 'warning' ? 'HIGH' : 'CRIT'}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-subtitle">KAIA landside parking · Live overview · {now} AST</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pill">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c995', display: 'inline-block' }} />
            Live
          </span>
          <span className="badge badge-purple">
            <IconAtom size={11} />
            NOOR Active
          </span>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 20 }}>
        {kpis.map(k => (
          <div key={k.label} className="kpi-card">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ fontSize: 22, color: k.color }}>{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 16, marginBottom: 16 }}>
        {/* Zone occupancy */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Zone Occupancy</div>
            <span className="badge badge-muted" style={{ fontSize: 11 }}>6 zones</span>
          </div>
          {zones.map(z => <ZoneBar key={z.name} {...z} />)}
        </div>

        {/* Revenue + products */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <div className="section-title">Revenue Mix — Today</div>
            {[
              { label: 'Dynamic Pricing', pct: 38, color: '#7c6af7' },
              { label: 'Pre-booking',     pct: 27, color: '#6aadff' },
              { label: 'Subscriptions',   pct: 20, color: '#34c995' },
              { label: 'Valet & Premium', pct: 9,  color: '#f0b840' },
              { label: 'Other',           pct: 6,  color: 'rgba(255,255,255,0.2)' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 100, fontSize: 12, color: 'rgba(238,238,248,0.6)', flexShrink: 0 }}>{r.label}</div>
                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${r.pct * 2}%`, height: '100%', background: r.color, borderRadius: 99 }} />
                </div>
                <div style={{ width: 32, textAlign: 'right', fontSize: 12, fontWeight: 700, color: r.color }}>{r.pct}%</div>
              </div>
            ))}
          </div>

          {/* NOOR insight */}
          <div className="noor-strip">
            <div className="noor-strip-icon">
              <IconAtom size={16} strokeWidth={1.8} />
            </div>
            <div className="noor-strip-body">
              <div className="noor-strip-title">NOOR Insight</div>
              <div className="noor-strip-text">Long Stay will reach 100% in ~38 min. Activate overflow redirect to Business zone + surge ×2.5 to redistribute demand.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent events */}
      <div className="card">
        <div className="section-title">Recent Events</div>
        {recentEvents.map((ev, i) => {
          const Icon = ev.icon
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < recentEvents.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `${ev.color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} color={ev.color} strokeWidth={2} />
              </div>
              <div style={{ flex: 1, fontSize: 13, color: 'rgba(238,238,248,0.8)' }}>{ev.text}</div>
              <div style={{ fontSize: 11, color: 'rgba(238,238,248,0.32)', whiteSpace: 'nowrap' }}>{ev.time}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
