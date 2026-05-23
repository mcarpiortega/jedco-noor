import { useState } from 'react'
import { IconAtom, IconTrendingUp, IconEdit, IconCalendar, IconToggleRight } from '@tabler/icons-react'

const zones = [
  { name: 'Long Stay', multiplier: 2.1, base: 15,  status: 'critical' },
  { name: 'Business',  multiplier: 1.8, base: 22,  status: 'critical' },
  { name: 'Private',   multiplier: 1.4, base: 18,  status: 'warning'  },
  { name: 'VIP',       multiplier: 1.1, base: 45,  status: 'neutral'  },
  { name: 'Staff',     multiplier: 1.0, base: 0,   status: 'neutral'  },
  { name: 'Rental',    multiplier: 0.9, base: 12,  status: 'discount' },
]

const rules = [
  { label: 'Occupancy surge',     desc: 'Raise price when zone > 80% full',         on: true  },
  { label: 'Flight wave',         desc: 'Surge on inbound flight cluster within 1h', on: true  },
  { label: 'Time-of-day',         desc: 'Peak / off-peak schedule differential',     on: true  },
  { label: 'Overflow redirect',   desc: 'Price incentive to shift to lower zones',   on: false },
  { label: 'Off-peak flat rate',  desc: 'Fixed rate 22:00–05:00 to stimulate use',  on: false },
]

// 12-bar demand chart data (normalised 0–100)
const demandBars = [30, 42, 55, 48, 72, 90, 87, 95, 80, 68, 58, 45]

const modeColor = { critical: '#ff7b7a', warning: '#f0b840', neutral: 'rgba(238,238,248,0.4)', discount: '#34c995' }
const multColor  = { critical: '#ff7b7a', warning: '#f0b840', neutral: 'rgba(238,238,248,0.5)', discount: '#34c995' }
const multBg    = { critical: 'rgba(226,75,74,0.13)', warning: 'rgba(212,143,26,0.13)', neutral: 'rgba(255,255,255,0.05)', discount: 'rgba(29,158,117,0.13)' }

function Toggle({ on, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={on} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-track" />
    </label>
  )
}

export default function Pricing() {
  const [mode, setMode] = useState('auto')
  const [ruleStates, setRuleStates] = useState(rules.map(r => r.on))

  const toggleRule = (i, val) => {
    const next = [...ruleStates]
    next[i] = val
    setRuleStates(next)
  }

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Pricing</div>
          <div className="page-subtitle">Dynamic rate management · NOOR Auto mode active</div>
        </div>
        <span className="badge badge-purple">
          <IconAtom size={11} />
          NOOR Pricing Engine
        </span>
      </div>

      {/* Mode tabs */}
      <div className="tab-row">
        {[
          { key: 'auto',     label: 'Auto (NOOR)',      icon: IconAtom        },
          { key: 'manual',   label: 'Manual Override',  icon: IconEdit        },
          { key: 'scheduled',label: 'Scheduled',        icon: IconCalendar    },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`tab-btn ${mode === key ? 'active' : ''}`}
            onClick={() => setMode(key)}
          >
            <Icon size={13} style={{ display: 'inline', marginRight: 5 }} strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>

      {/* Zone rate table */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-title">Zone Rates — Live</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Zone</th>
              <th>Multiplier</th>
              <th style={{ textAlign: 'right' }}>Base (SAR/hr)</th>
              <th style={{ textAlign: 'right' }}>Effective (SAR/hr)</th>
              <th style={{ textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {zones.map(z => {
              const effective = (z.base * z.multiplier).toFixed(0)
              return (
                <tr key={z.name}>
                  <td style={{ fontWeight: 600 }}>{z.name}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {/* multiplier bar */}
                      <div style={{ width: 100, height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(z.multiplier / 2.5 * 100, 100)}%`, height: '100%', background: modeColor[z.status], borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: modeColor[z.status] }}>×{z.multiplier.toFixed(1)}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>{z.base === 0 ? '—' : z.base}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: modeColor[z.status] }}>
                    {z.base === 0 ? 'Exempt' : effective}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 9px',
                      borderRadius: 99,
                      fontSize: 11,
                      fontWeight: 700,
                      background: multBg[z.status],
                      color: multColor[z.status],
                    }}>
                      {z.status === 'critical' ? 'SURGE' : z.status === 'warning' ? 'HIGH' : z.status === 'discount' ? 'DISC' : 'BASE'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pricing rules + Demand chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Rules */}
        <div className="card">
          <div className="section-title">Pricing Rules</div>
          {rules.map((r, i) => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < rules.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <Toggle on={ruleStates[i]} onChange={v => toggleRule(i, v)} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: ruleStates[i] ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{r.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 1 }}>{r.desc}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: ruleStates[i] ? '#34c995' : 'rgba(255,255,255,0.2)' }}>
                {ruleStates[i] ? 'ON' : 'OFF'}
              </span>
            </div>
          ))}
        </div>

        {/* Demand signal */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Demand Signal · 6h Projection</div>
            <span className="badge badge-purple" style={{ fontSize: 10 }}>NOOR Forecast</span>
          </div>

          {/* Mini bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 90, marginBottom: 8 }}>
            {demandBars.map((v, i) => {
              const isNow = i === 5
              const color = v >= 85 ? '#ff7b7a' : v >= 70 ? '#f0b840' : '#7c6af7'
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{
                    width: '100%',
                    height: `${v}%`,
                    background: isNow ? color : `${color}80`,
                    borderRadius: '3px 3px 0 0',
                    border: isNow ? `1px solid ${color}` : 'none',
                  }} />
                  {isNow && <div style={{ width: 4, height: 4, borderRadius: '50%', background: color }} />}
                </div>
              )
            })}
          </div>

          {/* X axis labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-tertiary)' }}>
            <span>−3h</span><span>−2h</span><span>−1h</span>
            <span style={{ color: 'var(--purple-text)', fontWeight: 700 }}>Now</span>
            <span>+1h</span><span>+2h</span><span>+3h</span>
          </div>

          <div className="noor-strip" style={{ marginTop: 14, padding: '12px 14px' }}>
            <div className="noor-strip-icon"><IconAtom size={15} strokeWidth={1.8} /></div>
            <div className="noor-strip-body">
              <div className="noor-strip-title" style={{ fontSize: 12 }}>NOOR Pricing Action</div>
              <div className="noor-strip-text" style={{ fontSize: 12 }}>Long Stay surge cap ×2.1 generated +18K SAR vs baseline in last 2h. Recommend maintaining.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
