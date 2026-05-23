import { IconAlertTriangle, IconAtom, IconCircleCheck, IconClock, IconShieldCheck } from '@tabler/icons-react'

const kpis = [
  { label: 'Active Incidents', value: '23',     accent: '#ff7b7a' },
  { label: 'Critical',         value: '2',      accent: '#ff7b7a' },
  { label: 'Avg Resolution',   value: '47 min', accent: '#f0b840' },
  { label: 'Resolved Today',   value: '31',     accent: '#34c995' },
  { label: 'SLA Compliance',   value: '94.3%',  accent: '#34c995' },
]

const incidents = [
  { id: 'INC-2841', priority: 'critical', zone: 'Long Stay', type: 'Capacity breach',     status: 'Active',      sla: 'BREACH',   open: '73 min' },
  { id: 'INC-2840', priority: 'critical', zone: 'Business',  type: 'Gate barrier jam',    status: 'Dispatched',  sla: 'AT RISK',  open: '28 min' },
  { id: 'INC-2839', priority: 'high',     zone: 'Private',   type: 'Payment terminal',    status: 'In Progress', sla: 'OK',       open: '12 min' },
  { id: 'INC-2838', priority: 'high',     zone: 'Private',   type: 'Unauthorised vehicle',status: 'Dispatched',  sla: 'OK',       open: '9 min'  },
  { id: 'INC-2837', priority: 'medium',   zone: 'Rental',    type: 'LPR camera offline',  status: 'In Progress', sla: 'OK',       open: '21 min' },
  { id: 'INC-2836', priority: 'medium',   zone: 'VIP',       type: 'Wrong-way driver',    status: 'Active',      sla: 'OK',       open: '5 min'  },
  { id: 'INC-2835', priority: 'low',      zone: 'Staff',     type: 'Lights malfunction',  status: 'Pending',     sla: 'OK',       open: '44 min' },
]

const zoneHotspots = [
  { name: 'Private',   count: 10, max: 23, color: '#f0b840' },
  { name: 'Long Stay', count: 2,  max: 23, color: '#ff7b7a' },
  { name: 'Staff',     count: 3,  max: 23, color: '#34c995' },
  { name: 'Rental',    count: 3,  max: 23, color: '#34c995' },
  { name: 'Business',  count: 4,  max: 23, color: '#f0b840' },
  { name: 'VIP',       count: 1,  max: 23, color: '#34c995' },
]

const typeBreakdown = [
  { type: 'Access / barrier', count: 8 },
  { type: 'Capacity',         count: 4 },
  { type: 'Equipment fault',  count: 5 },
  { type: 'Vehicle incident', count: 3 },
  { type: 'System / IT',      count: 3 },
]

const PRIORITY_COLOR = { critical: '#ff7b7a', high: '#f0b840', medium: '#6aadff', low: 'rgba(238,238,248,0.3)' }
const SLA_COLOR       = { 'BREACH': '#ff7b7a', 'AT RISK': '#f0b840', 'OK': '#34c995' }
const SLA_BG          = { 'BREACH': 'rgba(226,75,74,0.13)', 'AT RISK': 'rgba(212,143,26,0.13)', 'OK': 'rgba(29,158,117,0.13)' }
const STATUS_COLOR    = { Active: '#f0b840', Dispatched: '#6aadff', 'In Progress': '#7c6af7', Pending: 'rgba(238,238,248,0.4)', Resolved: '#34c995' }

export default function Incidents() {
  return (
    <div className="page">
      {/* Header — RED theme for emergency state */}
      <div className="page-header">
        <div>
          <div className="page-title" style={{ color: '#ff7b7a' }}>Incidents</div>
          <div className="page-subtitle">SGI — Service & Ground Intelligence · 2 critical active</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-critical">
            <IconAlertTriangle size={11} strokeWidth={2} />
            2 Critical
          </span>
          <span className="badge" style={{ background: 'rgba(226,75,74,0.13)', color: '#ff7b7a', border: '1px solid rgba(226,75,74,0.3)' }}>
            <IconAtom size={11} />
            NOOR Monitoring
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {kpis.map(k => (
          <div key={k.label} className="kpi-card" style={{ borderColor: k.accent === '#ff7b7a' ? 'rgba(226,75,74,0.2)' : 'var(--border)' }}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ fontSize: 24, color: k.accent }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Incident feed + right column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Feed */}
        <div className="card">
          <div className="section-title">Live Incident Feed</div>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 12 }}></th>
                <th>ID</th><th>Zone</th><th>Type</th><th>Status</th><th style={{ textAlign: 'center' }}>SLA</th><th style={{ textAlign: 'right' }}>Open</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map(inc => (
                <tr key={inc.id}>
                  <td>
                    {/* Priority dot with halo */}
                    <div style={{ position: 'relative', width: 10, height: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: PRIORITY_COLOR[inc.priority] }} />
                      {inc.priority === 'critical' && (
                        <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: `2px solid ${PRIORITY_COLOR[inc.priority]}40`, animation: 'none' }} />
                      )}
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>{inc.id}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{inc.zone}</td>
                  <td style={{ fontWeight: 500 }}>{inc.type}</td>
                  <td>
                    <span style={{ fontSize: 12, fontWeight: 600, color: STATUS_COLOR[inc.status] || 'var(--text-secondary)' }}>
                      {inc.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700, background: SLA_BG[inc.sla], color: SLA_COLOR[inc.sla] }}>
                      {inc.sla}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-tertiary)' }}>{inc.open}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Zone heatmap */}
          <div className="card">
            <div className="section-title">Zone Hotspots</div>
            {zoneHotspots.map(z => (
              <div key={z.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: 70, fontSize: 12, color: 'var(--text-secondary)' }}>{z.name}</div>
                <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${z.count / z.max * 100}%`, height: '100%', background: z.color, borderRadius: 99 }} />
                </div>
                <div style={{ width: 18, textAlign: 'right', fontSize: 12, fontWeight: 700, color: z.color }}>{z.count}</div>
              </div>
            ))}
          </div>

          {/* Type breakdown */}
          <div className="card">
            <div className="section-title">Incident Types</div>
            {typeBreakdown.map((t, i) => (
              <div key={t.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < typeBreakdown.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.type}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{t.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NOOR critical alert */}
      <div style={{
        background: 'rgba(226,75,74,0.1)',
        border: '1px solid rgba(226,75,74,0.35)',
        borderRadius: 'var(--r-lg)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
      }}>
        <div style={{ width: 34, height: 34, background: 'rgba(226,75,74,0.18)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <IconAtom size={18} color="#ff7b7a" strokeWidth={1.8} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#ff7b7a', marginBottom: 4 }}>NOOR Critical Alert — INC-2840</div>
          <div style={{ fontSize: 13, color: 'rgba(238,238,248,0.75)', lineHeight: 1.6 }}>
            Gate LG-03 (Long Stay) barrier jammed for <strong style={{ color: '#ff7b7a' }}>73 minutes</strong>. SLA threshold exceeded (60 min). Queue backing up — 28 vehicles delayed. CCTV confirms barrier stuck in closed position. Dispatch maintenance team immediately.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button className="btn btn-ghost btn-sm">
            <IconShieldCheck size={13} strokeWidth={2} />
            Acknowledge
          </button>
          <button className="btn btn-danger btn-sm">
            <IconAlertTriangle size={13} strokeWidth={2} />
            Dispatch Now
          </button>
        </div>
      </div>
    </div>
  )
}
