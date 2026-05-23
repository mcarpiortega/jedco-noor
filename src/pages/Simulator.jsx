import { useState } from 'react'
import { IconAtom, IconPlayerPlay, IconArrowUpRight, IconBookmark, IconTrendingUp, IconTrendingDown, IconMinus } from '@tabler/icons-react'

const SCENARIO_TYPES = ['What-if', 'Forecast', 'Stress']
const HORIZONS = ['1d', '7d', '30d']
const PRODUCTS = [
  'Dynamic Pricing', 'Pre-booking', 'Subscriptions', 'Valet', 'Rental', 'B2B'
]

// 7-day paired bar chart data
const chartBars = [
  { label: 'Mon', base: 60, scenario: 74 },
  { label: 'Tue', base: 65, scenario: 80 },
  { label: 'Wed', base: 58, scenario: 72 },
  { label: 'Thu', base: 80, scenario: 95 },
  { label: 'Fri', base: 90, scenario: 108 },
  { label: 'Sat', base: 72, scenario: 88 },
  { label: 'Sun', base: 55, scenario: 68 },
]

const deltaCards = [
  { label: 'Weekly Revenue',    base: '638K SAR', scenario: '765K SAR', delta: '+127K',  pct: '+19.9%', dir: 'up'   },
  { label: 'Avg Occupancy',    base: '71.5%',    scenario: '78.2%',    delta: '+6.7pp', pct: '',       dir: 'up'   },
  { label: 'Pre-booking Rate', base: '22%',      scenario: '29%',      delta: '+7pp',   pct: '',       dir: 'up'   },
  { label: 'Walk-in Volume',   base: '18.4K',    scenario: '17.1K',    delta: '−1.3K',  pct: '−7.1%', dir: 'down' },
  { label: 'Abandonment Rate', base: '4.2%',     scenario: '5.9%',     delta: '+1.7pp', pct: '',       dir: 'warn' },
  { label: 'Price Elasticity', base: '−0.82',    scenario: '−0.74',    delta: '+0.08',  pct: '',       dir: 'up'   },
]

const compTable = [
  { metric: 'Revenue / space / day', base: '29.8 SAR', scenario: '35.7 SAR', delta: '+19.8%', dir: 'up' },
  { metric: 'Avg dwell time (hr)',   base: '3.1',       scenario: '3.4',       delta: '+9.7%',  dir: 'up' },
  { metric: 'Peak occupancy',        base: '91%',       scenario: '96%',       delta: '+5.5pp', dir: 'warn' },
  { metric: 'Walk-in abandonment',   base: '4.2%',      scenario: '5.9%',      delta: '+1.7pp', dir: 'warn' },
  { metric: 'NPS proxy',             base: '72',        scenario: '68',        delta: '−4 pts', dir: 'down' },
]

const dirColor = { up: '#34c995', down: '#ff7b7a', warn: '#f0b840', neutral: 'rgba(238,238,248,0.4)' }
const DirIcon = ({ dir }) => {
  if (dir === 'up')   return <IconTrendingUp size={13} strokeWidth={2} color={dirColor.up} />
  if (dir === 'down') return <IconTrendingDown size={13} strokeWidth={2} color={dirColor.down} />
  if (dir === 'warn') return <IconTrendingUp size={13} strokeWidth={2} color={dirColor.warn} />
  return <IconMinus size={13} strokeWidth={2} color={dirColor.neutral} />
}

const maxChartVal = Math.max(...chartBars.map(b => b.scenario))

export default function Simulator() {
  const [scenarioType, setScenarioType] = useState('What-if')
  const [horizon, setHorizon] = useState('7d')
  const [surgeCap, setSurgeCap] = useState(2.5)
  const [discount, setDiscount] = useState(12)
  const [loadFactor, setLoadFactor] = useState(84)
  const [adoption, setAdoption] = useState(22)
  const [products, setProducts] = useState(new Set(['Dynamic Pricing', 'Pre-booking', 'Subscriptions']))
  const [ran, setRan] = useState(true)

  const toggleProduct = (p) => {
    const next = new Set(products)
    next.has(p) ? next.delete(p) : next.add(p)
    setProducts(next)
  }

  return (
    <div className="app-shell" style={{ height: '100%', flexDirection: 'row' }}>
      {/* ── Config Panel ── */}
      <div style={{
        width: 280,
        minWidth: 280,
        background: '#08080f',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}>
        {/* Panel header */}
        <div style={{ padding: '20px 18px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Simulation Config</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Palantir AIP · EU tenant</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Scenario type */}
          <div>
            <div className="section-title">Scenario Type</div>
            <div style={{ display: 'flex', gap: 3, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3 }}>
              {SCENARIO_TYPES.map(t => (
                <button key={t} onClick={() => setScenarioType(t)} style={{
                  flex: 1, padding: '6px 0', borderRadius: 6, fontSize: 12, fontWeight: 500,
                  border: 'none', cursor: 'pointer', fontFamily: 'var(--font)',
                  background: scenarioType === t ? 'var(--bg-card)' : 'transparent',
                  color: scenarioType === t ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  outline: scenarioType === t ? '1px solid var(--border)' : 'none',
                }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Horizon */}
          <div>
            <div className="section-title">Forecast Horizon</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {HORIZONS.map(h => (
                <button key={h} onClick={() => setHorizon(h)} style={{
                  flex: 1, padding: '7px 0', borderRadius: 7, fontSize: 12, fontWeight: 600,
                  border: horizon === h ? '1px solid var(--purple-border)' : '1px solid var(--border)',
                  cursor: 'pointer', fontFamily: 'var(--font)', textTransform: 'uppercase', letterSpacing: 0.5,
                  background: horizon === h ? 'var(--purple-bg)' : 'transparent',
                  color: horizon === h ? 'var(--purple-text)' : 'var(--text-tertiary)',
                }}>
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing sliders */}
          <div>
            <div className="section-title">Pricing Parameters</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Surge cap</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple-text)' }}>×{surgeCap.toFixed(1)}</div>
                </div>
                <input type="range" min={1} max={4} step={0.1} value={surgeCap} onChange={e => setSurgeCap(+e.target.value)} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Pre-booking discount</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple-text)' }}>−{discount}%</div>
                </div>
                <input type="range" min={0} max={30} step={1} value={discount} onChange={e => setDiscount(+e.target.value)} />
              </div>
            </div>
          </div>

          {/* Demand sliders */}
          <div>
            <div className="section-title">Demand Parameters</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Flight load factor</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple-text)' }}>{loadFactor}%</div>
                </div>
                <input type="range" min={40} max={100} step={1} value={loadFactor} onChange={e => setLoadFactor(+e.target.value)} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Pre-booking adoption</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple-text)' }}>{adoption}%</div>
                </div>
                <input type="range" min={5} max={60} step={1} value={adoption} onChange={e => setAdoption(+e.target.value)} />
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="section-title">Active Products</div>
            {PRODUCTS.map(p => (
              <label key={p} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0', cursor: 'pointer' }}>
                <input type="checkbox" checked={products.has(p)} onChange={() => toggleProduct(p)} />
                <span style={{ fontSize: 12, color: products.has(p) ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Run button */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px 0' }}
            onClick={() => setRan(true)}>
            <IconPlayerPlay size={15} strokeWidth={2} />
            Run Simulation
          </button>
        </div>
      </div>

      {/* ── Output Panel ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
        {/* Output header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
              {scenarioType} Results · {horizon} horizon
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
              Surge ×{surgeCap} · −{discount}% pre-booking · {loadFactor}% load · {adoption}% adoption
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="pill"><IconAtom size={11} style={{ display: 'inline' }} /> Palantir AIP · EU tenant</span>
            {/* Confidence */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>Model confidence</span>
              <div style={{ width: 80, height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ width: '87%', height: '100%', background: '#34c995', borderRadius: 99 }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#34c995' }}>87%</span>
            </div>
          </div>
        </div>

        {/* Delta cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {deltaCards.map(d => (
            <div key={d.label} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8 }}>{d.label}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Baseline</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>{d.base}</div>
                </div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.12)', fontWeight: 300 }}>→</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Scenario</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: dirColor[d.dir] }}>{d.scenario}</div>
                </div>
              </div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: dirColor[d.dir] }}>
                <DirIcon dir={d.dir} />
                {d.delta} {d.pct && <span style={{ fontWeight: 500, opacity: 0.75 }}>{d.pct}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* 7-day bar chart */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>7-Day Revenue Projection (K SAR)</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(83,74,183,0.4)' }} />Baseline</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: '#7c6af7' }} />Scenario</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 110 }}>
            {chartBars.map(b => (
              <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-end', height: 95 }}>
                  <div style={{ flex: 1, background: 'rgba(83,74,183,0.3)', borderRadius: '3px 3px 0 0', height: `${b.base / maxChartVal * 100}%` }} />
                  <div style={{ flex: 1, background: '#7c6af7', borderRadius: '3px 3px 0 0', height: `${b.scenario / maxChartVal * 100}%` }} />
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="section-title">Metric Comparison</div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>Baseline</th>
                <th style={{ textAlign: 'right' }}>Scenario</th>
                <th style={{ textAlign: 'right' }}>Delta</th>
              </tr>
            </thead>
            <tbody>
              {compTable.map(r => (
                <tr key={r.metric}>
                  <td>{r.metric}</td>
                  <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>{r.base}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{r.scenario}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: dirColor[r.dir] }}>
                    <span style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
                      <DirIcon dir={r.dir} />
                      {r.delta}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NOOR verdict */}
        <div style={{
          background: 'var(--purple-bg)',
          border: '1px solid var(--purple-border)',
          borderRadius: 'var(--r-lg)',
          padding: '18px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <IconAtom size={18} color="var(--purple-light)" strokeWidth={1.8} />
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--purple-text)' }}>NOOR Verdict</div>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(238,238,248,0.8)', lineHeight: 1.7, marginBottom: 14 }}>
            This scenario generates <strong style={{ color: '#34c995' }}>+127K SAR weekly uplift (+19.9%)</strong> primarily from higher pre-booking adoption and optimised surge pricing.
            Key trade-off: walk-in abandonment increases by <strong style={{ color: '#f0b840' }}>+1.7 percentage points</strong>, which may affect NPS.
            Overall model confidence is 87%. Recommend activating with walk-in monitoring trigger at 6% abandonment threshold.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-primary">
              <IconArrowUpRight size={15} strokeWidth={2} />
              Activate Scenario
            </button>
            <button className="btn btn-ghost">
              <IconBookmark size={15} strokeWidth={2} />
              Save & Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
