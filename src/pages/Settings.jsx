import { useState } from 'react'
import { IconAtom, IconShield, IconBell, IconDatabase, IconKey } from '@tabler/icons-react'

function Toggle({ on, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={on} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-track" />
    </label>
  )
}

const SECTIONS = ['General', 'NOOR Engine', 'Alerts', 'Integrations', 'Security']

export default function Settings() {
  const [section, setSection] = useState('General')
  const [noorAuto, setNoorAuto] = useState(true)
  const [noorSim, setNoorSim] = useState(true)
  const [noorForecast, setNoorForecast] = useState(true)
  const [alertSLA, setAlertSLA] = useState(true)
  const [alertCapacity, setAlertCapacity] = useState(true)
  const [alertPricing, setAlertPricing] = useState(false)
  const [pdplMode, setPdplMode] = useState(true)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Settings</div>
          <div className="page-subtitle">System configuration · JEDCO NOOR platform</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 20 }}>
        {/* Section nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setSection(s)} style={{
              padding: '9px 12px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font)',
              background: section === s ? 'var(--purple-bg)' : 'transparent',
              color: section === s ? 'var(--purple-text)' : 'var(--text-secondary)',
              borderLeft: section === s ? '2px solid var(--purple-light)' : '2px solid transparent',
            }}>
              {s}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* GENERAL */}
          {section === 'General' && (
            <div className="card">
              <div className="section-title">Platform Information</div>
              {[
                { label: 'Platform',        value: 'JEDCO NOOR' },
                { label: 'Airport',         value: 'King Abdulaziz International Airport (KAIA)' },
                { label: 'Operator',        value: 'JEDCO' },
                { label: 'Vendor',          value: 'EYSA Parkvision' },
                { label: 'Backend',         value: 'Palantir Foundry + AIP (EU SaaS tenant)' },
                { label: 'Data Compliance', value: 'SDAIA / NDMO / PDPL — KSA Sovereign' },
                { label: 'Total zones',     value: '6 (Private, Long Stay, Staff, Rental, Business, VIP)' },
                { label: 'Total spaces',    value: '21,367' },
                { label: 'Version',         value: 'NOOR v1.0.0 — Beta Preview' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: 180, fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{row.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* NOOR ENGINE */}
          {section === 'NOOR Engine' && (
            <div className="card">
              <div className="section-title">NOOR AI Configuration</div>
              {[
                { label: 'Auto pricing mode',    desc: 'NOOR controls all zone rates automatically based on demand signals', state: noorAuto,     set: setNoorAuto     },
                { label: 'Simulation module',    desc: 'Enable what-if and forecast scenario engine via Palantir AIP',      state: noorSim,      set: setNoorSim      },
                { label: 'Demand forecasting',   desc: '6-hour and 30-day occupancy and revenue projections',               state: noorForecast, set: setNoorForecast },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{r.desc}</div>
                  </div>
                  <Toggle on={r.state} onChange={r.set} />
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <div className="noor-strip" style={{ padding: '12px 14px' }}>
                  <div className="noor-strip-icon"><IconAtom size={15} strokeWidth={1.8} /></div>
                  <div className="noor-strip-body">
                    <div className="noor-strip-title" style={{ fontSize: 12 }}>Palantir AIP Connection</div>
                    <div className="noor-strip-text" style={{ fontSize: 12 }}>EU SaaS tenant · Connected · Latency: 38ms · Last sync: 12 sec ago</div>
                  </div>
                  <span className="badge badge-ok" style={{ flexShrink: 0 }}>Online</span>
                </div>
              </div>
            </div>
          )}

          {/* ALERTS */}
          {section === 'Alerts' && (
            <div className="card">
              <div className="section-title">Alert Configuration</div>
              {[
                { label: 'SLA breach alerts',    desc: 'Notify when incident SLA threshold is exceeded',            state: alertSLA,      set: setAlertSLA      },
                { label: 'Capacity warnings',    desc: 'Alert when zone occupancy exceeds 80%',                     state: alertCapacity, set: setAlertCapacity },
                { label: 'Pricing change alerts',desc: 'Notify when NOOR applies a multiplier change ≥ ×0.5',      state: alertPricing,  set: setAlertPricing  },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{r.desc}</div>
                  </div>
                  <Toggle on={r.state} onChange={r.set} />
                </div>
              ))}
            </div>
          )}

          {/* INTEGRATIONS */}
          {section === 'Integrations' && (
            <div className="card">
              <div className="section-title">Connected Systems</div>
              {[
                { name: 'DESIGNA ABACUS',    role: 'Barrier & gate control',         status: 'Connected' },
                { name: 'LPR System',         role: 'Licence plate recognition',       status: 'Connected' },
                { name: 'Palantir Foundry',   role: 'EU SaaS analytics backend',      status: 'Connected' },
                { name: 'AWS S3 / Glue ETL',  role: 'KSA regional data pipeline',     status: 'Connected' },
                { name: 'Flight data API',    role: 'Live inbound flight schedule',    status: 'Connected' },
                { name: 'Payment Gateway',    role: 'SAR processing (STC Pay, Mada)',  status: 'Connected' },
                { name: 'CCTV NVR',           role: 'Security video feeds',           status: 'Partial'   },
                { name: 'Mobile App SDK',     role: 'Pre-booking & access QR',        status: 'Pending'   },
              ].map(int => (
                <div key={int.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: int.status === 'Connected' ? '#34c995' : int.status === 'Partial' ? '#f0b840' : 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{int.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 1 }}>{int.role}</div>
                  </div>
                  <span className={`badge ${int.status === 'Connected' ? 'badge-ok' : int.status === 'Partial' ? 'badge-warning' : 'badge-muted'}`}>
                    {int.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* SECURITY */}
          {section === 'Security' && (
            <div className="card">
              <div className="section-title">Data Security & Compliance</div>
              {[
                { label: 'PDPL compliance mode', desc: 'Anonymise PII at source before export to EU tenant', state: pdplMode, set: setPdplMode },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{r.desc}</div>
                  </div>
                  <Toggle on={r.state} onChange={r.set} />
                </div>
              ))}
              <div style={{ marginTop: 14 }}>
                {[
                  { label: 'Compliance framework', value: 'SDAIA / NDMO / PDPL (KSA)' },
                  { label: 'Data residency',        value: 'PII stays in KSA · Analytics EU' },
                  { label: 'Encryption at rest',    value: 'AES-256 · AWS KMS' },
                  { label: 'Audit log',              value: 'Immutable · Palantir Foundry' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 180, fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{row.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
