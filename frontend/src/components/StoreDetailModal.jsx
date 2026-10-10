import React from 'react';
import { X, Sparkles, ExternalLink, Mail, Calendar, TrendingDown, TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function StoreDetailModal({
  store,
  isOpen,
  onClose,
  onRunAiScan,
  onChangeStatus,
  aiScanning = false
}) {
  if (!isOpen || !store) return null;

  const isDeclining = store.revenueGrowth < 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h3 style={{ fontSize: '1.3rem' }}>{store.name}</h3>
              <StatusBadge status={store.status} />
              <span className="status-pill" style={{ background: 'var(--soft-blush-light)', color: 'var(--burgundy)', border: '1px solid var(--soft-blush)' }}>
                {store.plan} Plan
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
              Store ID: {store.id} • Registered {new Date(store.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Declining Warning Banner if relevant */}
          {isDeclining && (
            <div className="alert-banner danger" style={{ marginBottom: 20 }}>
              <div className="alert-content">
                <AlertCircle size={20} color="var(--bright-red)" />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Attention: Revenue Declining ({store.revenueGrowth}%)</strong>
                  <span style={{ fontSize: '0.82rem' }}>
                    This merchant storefront is experiencing reduced conversions and higher bounce rates. Run AI Diagnostics below to generate corrective proposals.
                  </span>
                </div>
              </div>
              <button
                className="btn btn-accent btn-sm"
                onClick={() => onRunAiScan(store.id)}
                disabled={aiScanning}
              >
                <Sparkles size={14} />
                {aiScanning ? 'Scanning...' : 'Trigger AI Audit'}
              </button>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
            <div style={{ background: 'var(--warm-off-white)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Monthly Revenue</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--burgundy)', margin: '4px 0' }}>
                ₹{store.monthlyRevenue?.toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4, color: isDeclining ? 'var(--bright-red)' : '#10B981', fontWeight: 700 }}>
                {isDeclining ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                {store.revenueGrowth}% MoM
              </span>
            </div>

            <div style={{ background: 'var(--warm-off-white)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Orders Count</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--burgundy)', margin: '4px 0' }}>
                {store.totalOrders}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Past 30 days</span>
            </div>

            <div style={{ background: 'var(--warm-off-white)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Conversion Rate</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--burgundy)', margin: '4px 0' }}>
                {store.conversionRate}%
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Industry avg ~2.5%</span>
            </div>

            <div style={{ background: 'var(--warm-off-white)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Store Health</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: store.healthScore < 70 ? 'var(--bright-red)' : '#10B981', margin: '4px 0' }}>
                {store.healthScore} / 100
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bounce: {store.bounceRate}%</span>
            </div>
          </div>

          {/* Details Sections */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Merchant Details */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 12, color: 'var(--burgundy)' }}>Merchant & Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Owner: </span>
                  <strong>{store.ownerName}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Email: </span>
                  <a href={`mailto:${store.ownerEmail}`} style={{ color: 'var(--marine-blue)', textDecoration: 'none' }}>
                    {store.ownerEmail}
                  </a>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Category: </span>
                  <span>{store.category}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Storefront URL: </span>
                  <a href={store.url} target="_blank" rel="noreferrer" style={{ color: 'var(--marine-blue)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {store.url} <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions & Status Control */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 12, color: 'var(--marine-blue)' }}>Administrative Controls</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 14 }}>
                Change store operational status or dispatch a fresh AI performance audit.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => onChangeStatus(store.id, store.status === 'active' ? 'inactive' : 'active')}
                  >
                    {store.status === 'active' ? 'Set Inactive' : 'Set Active'}
                  </button>
                  <button
                    className="btn btn-danger-outline btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => onChangeStatus(store.id, store.status === 'suspended' ? 'active' : 'suspended')}
                  >
                    {store.status === 'suspended' ? 'Lift Suspension' : 'Suspend Store'}
                  </button>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => onRunAiScan(store.id)}
                  disabled={aiScanning}
                >
                  <Sparkles size={14} />
                  {aiScanning ? 'AI Engine Scanning Metrics...' : 'Run Real-Time AI Optimization Scan'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
