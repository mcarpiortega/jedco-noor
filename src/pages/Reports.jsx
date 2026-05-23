import { IconChartBar, IconAtom, IconDownload, IconCalendar } from '@tabler/icons-react'

const barData = [
  { month: 'Nov', val: 3.2 }, { month: 'Dec', val: 4.1 }, { month: 'Jan', val: 3.8 },
  { month: 'Feb', val: 4.4 }, { month: 'Mar', val: 5.1 }, { month: 'Apr', val: 5.8 },
  { month: 'May', val: 6.4 }, { month: 'Jun', val: 7.2 },
]
const max = Math.max(...barData.map(b => b.val))

const reports = [
  { name: 'Monthly Operations Summary — May 2025', date: '01 Jun 2025', type: 'PDF', size: '2.4 MB' },
  { name: 'Pricing Performance Report — Q2 2025',  date: '15 May 2025', type: 'XLSX', size: '840 KB' },
  { name: 'Incident Analysis — April 2025',         date: '05 May 2025', type: 'PDF', size: '1.1 MB' },
  { name: 'Revenue Forecast — H2 2025 (NOOR)',      date: '28 Apr 2025', type: 'PDF', size: '3.2 MB' },
  { name: 'Subscription Cohort Analysis',           date: '10 Apr 2025', type: 'XLSX', size: '560 KB' },
]

export default function Reports() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Reports</div>
          <div className="page-subtitle">Analytics, BI exports, and NOOR-generated forecasts</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm">
            <IconCalendar size={14} strokeWidth={2} />
            Date range
          </button>
          <button className="btn btn-primary btn-sm">
            <IconDownload size={14} strokeWidth={2} />
            Export
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Revenue MTD',    value: '5.4M SAR',  sub: 'May 2025',     color: '#7c6af7' },
          { label: 'YoY Growth',     value: '+31.4%',    sub: 'vs May 2024',  color: '#34c995' },
          { label: 'NOOR Uplift',    value: '+820K SAR', sub: 'AI contribution', color: '#6aadff' },
          { label: 'Avg Occupancy',  value: '73.8%',     sub: 'Rolling 30d',  color: 'var(--text-primary)' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ fontSize: 22, color: k.color }}>{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue trend chart */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Monthly Revenue Trend (M SAR)</div>
          <span className="badge badge-purple"><IconAtom size={11} /> NOOR Forecast</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120 }}>
          {barData.map((b, i) => {
            const isForecast = i >= 6
            return (
              <div key={b.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 4 }}>
                <div style={{ fontSize: 10, color: '#7c6af7', fontWeight: 700, opacity: isForecast ? 1 : 0 }}>{isForecast ? b.val.toFixed(1) : ''}</div>
                <div style={{
                  width: '100%',
                  height: `${b.val / max * 100}%`,
                  background: isForecast ? 'rgba(124,106,247,0.4)' : '#534AB7',
                  borderRadius: '4px 4px 0 0',
                  border: isForecast ? '1px dashed rgba(124,106,247,0.6)' : 'none',
                }} />
                <div style={{ fontSize: 10, color: isForecast ? 'var(--purple-text)' : 'var(--text-tertiary)' }}>{b.month}</div>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-tertiary)' }}>
          Jun–Jul marked as NOOR forecast (dashed). Based on current booking pace + demand model.
        </div>
      </div>

      {/* Report library */}
      <div className="card">
        <div className="section-title">Report Library</div>
        {reports.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < reports.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: r.type === 'PDF' ? 'rgba(226,75,74,0.15)' : 'rgba(29,158,117,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IconChartBar size={16} color={r.type === 'PDF' ? '#ff7b7a' : '#34c995'} strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{r.date} · {r.size}</div>
            </div>
            <span className={`badge ${r.type === 'PDF' ? 'badge-critical' : 'badge-ok'}`} style={{ fontSize: 10 }}>{r.type}</span>
            <button className="btn btn-ghost btn-sm">
              <IconDownload size={13} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>

      <div className="noor-strip" style={{ marginTop: 16 }}>
        <div className="noor-strip-icon"><IconAtom size={16} strokeWidth={1.8} /></div>
        <div className="noor-strip-body">
          <div className="noor-strip-title">NOOR Monthly Report Ready</div>
          <div className="noor-strip-text">June 2025 automated report generated. Revenue +31% YoY, incidents −18%, pre-booking adoption up 7pp. Ready for JEDCO board presentation.</div>
        </div>
        <button className="btn btn-ghost btn-sm">
          <IconDownload size={13} strokeWidth={2} />
          Download
        </button>
      </div>
    </div>
  )
}
