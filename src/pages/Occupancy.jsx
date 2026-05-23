import { IconAtom, IconCar, IconArrowUp, IconArrowDown, IconAlertTriangle, IconRefresh } from '@tabler/icons-react'

const kpis = [
  { label: 'Total Capacity', value: '21,367', sub: 'All zones combined' },
  { label: 'Occupied',       value: '15,284', sub: '71.5%',  accent: '#7c6af7' },
  { label: 'Available',      value: '6,083',  sub: 'Free spaces',  accent: '#34c995' },
  { label: 'NOOR ETA Full',  value: '~38 min',sub: 'Long Stay critical', accent: '#ff7b7a' },
]

const zones = [
  { name: 'Private',   total: 6840, pct: 76, occupied: 5198, flow: '+14',  flowDir: 'in',  status: 'ok'       },
  { name: 'Long Stay', total: 5120, pct: 92, occupied: 4710, flow: '+38',  flowDir: 'in',  status: 'critical' },
  { name: 'Staff',     total: 4200, pct: 61, occupied: 2562, flow: '+2',   flowDir: 'in',  status: 'ok'       },
  { name: 'Rental',    total: 2100, pct: 45, occupied: 945,  flow: '-6',   flowDir: 'out', status: 'ok'       },
  { name: 'Business',  total: 2307, pct: 88, occupied: 2030, flow: '+22',  flowDir: 'in',  status: 'warning'  },
  { name: 'VIP',       total: 800,  pct: 63, occupied: 504,  flow: '+3',   flowDir: 'in',  status: 'ok'       },
]

const flowRows = [
  { gate: 'Gate P-01',  zone: 'Private',   in: 42, out: 28, net: '+14' },
  { gate: 'Gate LS-02', zone: 'Long Stay', in: 61, out: 23, net: '+38' },
  { gate: 'Gate ST-01', zone: 'Staff',     in: 15, out: 13, net: '+2'  },
  { gate: 'Gate R-01',  zone: 'Rental',    in: 8,  out: 14, net: '-6'  },
  { gate: 'Gate B-01',  zone: 'Business',  in: 44, out: 22, net: '+22' },
  { gate: 'Gate VIP-1', zone: 'VIP',       in: 9,  out: 6,  net: '+3'  },
]

const statusColor = { ok: '#34c995', warning: '#f0b840', critical: '#ff7b7a' }
const statusBg    = { ok: 'rgba(29,158,117,0.13)', warning: 'rgba(212,143,26,0.13)', critical: 'rgba(226,75,74,0.13)' }

export default function Occupancy() {
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Occupancy</div>
          <div className="page-subtitle">Real-time parking space utilisation · {now} AST</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm">
            <IconRefresh size={14} strokeWidth={2} />
            Refresh
          </button>
          <span className="badge badge-purple">
            <IconAtom size={11} />
            NOOR Monitoring
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {kpis.map(k => (
          <div key={k.label} className="kpi-card">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ color: k.accent || 'var(--text-primary)' }}>{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Zone cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        {zones.map(z => (
          <div key={z.name} className="card" style={{
            borderColor: z.status === 'critical' ? 'rgba(226,75,74,0.35)' : z.status === 'warning' ? 'rgba(212,143,26,0.3)' : 'var(--border)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{z.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{z.total.toLocaleString()} total spaces</div>
              </div>
              <span className={`badge badge-${z.status === 'ok' ? 'ok' : z.status === 'warning' ? 'warning' : 'critical'}`}>
                {z.status === 'critical' ? 'CRITICAL' : z.status === 'warning' ? 'WARNING' : 'OK'}
              </span>
            </div>

            {/* Big % */}
            <div style={{ fontSize: 36, fontWeight: 800, color: statusColor[z.status], letterSpacing: -1, lineHeight: 1, marginBottom: 8 }}>
              {z.pct}%
            </div>

            {/* Progress bar */}
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${z.pct}%`, background: statusColor[z.status] }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{z.occupied.toLocaleString()} occupied</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 600,
                color: z.flowDir === 'in' ? '#ff7b7a' : '#34c995',
              }}>
                {z.flowDir === 'in'
                  ? <IconArrowUp size={12} strokeWidth={2.5} />
                  : <IconArrowDown size={12} strokeWidth={2.5} />}
                {z.flow} /min
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flow table + NOOR alert */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        {/* Flow table */}
        <div className="card">
          <div className="section-title">Entry / Exit Flow · Live</div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Gate</th>
                <th>Zone</th>
                <th style={{ textAlign: 'right' }}>In/min</th>
                <th style={{ textAlign: 'right' }}>Out/min</th>
                <th style={{ textAlign: 'right' }}>Net</th>
              </tr>
            </thead>
            <tbody>
              {flowRows.map(r => (
                <tr key={r.gate}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.gate}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.zone}</td>
                  <td style={{ textAlign: 'right', color: '#ff7b7a', fontWeight: 600 }}>{r.in}</td>
                  <td style={{ textAlign: 'right', color: '#34c995', fontWeight: 600 }}>{r.out}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: r.net.startsWith('+') ? '#ff7b7a' : '#34c995' }}>{r.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NOOR alert */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="noor-strip" style={{ background: 'rgba(226,75,74,0.1)', border: '1px solid rgba(226,75,74,0.3)', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, background: 'rgba(226,75,74,0.15)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconAlertTriangle size={16} color="#ff7b7a" strokeWidth={2} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ff7b7a' }}>NOOR Critical Alert</div>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(238,238,248,0.75)', lineHeight: 1.6 }}>
              Long Stay is at <strong style={{ color: '#ff7b7a' }}>92%</strong> and filling at 38 vehicles/min. At this rate, capacity will be reached in approximately <strong style={{ color: '#ff7b7a' }}>38 minutes</strong>.
            </div>
            <div style={{ fontSize: 12, color: 'rgba(238,238,248,0.5)' }}>
              Recommended: activate overflow redirect to Business zone + raise surge multiplier to ×2.5.
            </div>
            <button className="btn btn-danger btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              <IconAtom size={13} strokeWidth={2} />
              Activate Overflow Redirect
            </button>
          </div>

          <div className="noor-strip">
            <div className="noor-strip-icon">
              <IconAtom size={16} strokeWidth={1.8} />
            </div>
            <div className="noor-strip-body">
              <div className="noor-strip-title">Demand Forecast</div>
              <div className="noor-strip-text">Flight wave EK-813 + QR-502 expected in 40 min. Projected +1,200 additional arrivals. Pre-position staff at Gate LS-03.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
