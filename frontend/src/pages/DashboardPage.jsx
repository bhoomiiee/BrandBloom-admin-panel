import React from 'react';
import {
  Store, DollarSign, TrendingDown, Sparkles, Rocket, ArrowRight,
  TrendingUp, AlertTriangle, PlusCircle, CheckCircle2, ShoppingBag
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import StatusBadge from '../components/StatusBadge';
import { RevenueTrendChart } from '../components/SimpleChart';
import {
  CardBotanicalAccent,
  BotanicalBannerFoliage,
  PetalAccentCluster,
  BotanicalCornerFlourish
} from '../components/BotanicalDecorations';

export default function DashboardPage({
  stores = [],
  recommendations = [],
  upgrades = [],
  analyticsData = {},
  activityLogs = [],
  onNavigate,
  onOpenStoreModal,
  onSelectStore,
  onSelectUpgrade
}) {
  const activeStores = stores.filter(s => s.status === 'active' || s.status === 'declining');
  const decliningStores = stores.filter(s => s.status === 'declining' || s.revenueGrowth < 0);
  const pendingRecs = recommendations.filter(r => r.status === 'pending');
  const pendingUpgrades = upgrades.filter(u => u.ownerApprovalStatus === 'Pending Approval');
  const totalRevenue = stores.reduce((acc, s) => acc + (s.monthlyRevenue || 0), 0);

  const salesTrend = analyticsData?.salesTrend || [];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-box">
          <h1>Platform Overview</h1>
          <p>Real-time metrics, storefront health, and owner-approved optimization pipeline.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline" onClick={() => onNavigate('recommendations')}>
            <Sparkles size={16} color="var(--marine-blue)" />
            Review AI Suggestions ({pendingRecs.length})
          </button>
          <button className="btn btn-primary" onClick={onOpenStoreModal}>
            <PlusCircle size={16} />
            Register Store
          </button>
        </div>
      </div>

      {/* Declining Sales Alert Box (BrandBloom Core Problem Focus) */}
      {decliningStores.length > 0 && (
        <div className="alert-banner danger">
          <BotanicalBannerFoliage position="right" />
          <div className="alert-content">
            <AlertTriangle size={24} color="var(--bright-red)" />
            <div>
              <strong style={{ fontSize: '0.95rem' }}>
                Action Required: {decliningStores.length} stores experiencing declining sales
              </strong>
              <p style={{ fontSize: '0.84rem', margin: '2px 0 0' }}>
                AI engine has diagnosed high cart abandonment and slow page speeds on {decliningStores.map(s => s.name).join(', ')}.
              </p>
            </div>
          </div>
          <button
            className="btn btn-accent btn-sm"
            onClick={() => onNavigate('stores')}
          >
            Manage Declining Stores
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Top KPI Metrics Grid */}
      <div className="kpi-grid">
        <MetricCard
          title="Total Registered Stores"
          value={stores.length}
          trend={12.5}
          trendLabel="vs last month"
          icon={Store}
          highlight="blue"
          description={`${activeStores.length} actively selling`}
          onClick={() => onNavigate('stores')}
        />

        <MetricCard
          title="Combined Monthly Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          trend={8.4}
          trendLabel="across 10 stores"
          icon={DollarSign}
          highlight="yellow"
          description="Aggregate gross merchandise value"
        />

        <MetricCard
          title="Stores Declining Sales"
          value={decliningStores.length}
          trend={-15.2}
          trendLabel="critical focus"
          icon={TrendingDown}
          highlight="red"
          description="Need AI optimization proposals"
          onClick={() => onNavigate('stores')}
        />

        <MetricCard
          title="Pending Website Upgrades"
          value={pendingUpgrades.length}
          trendLabel="awaiting owner approval"
          icon={Rocket}
          highlight="blue"
          description={`${upgrades.length} total upgrade requests`}
          onClick={() => onNavigate('upgrades')}
        />
      </div>

      {/* Charts & Quick Performance Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 28 }}>
        {/* Sales Trend Chart Card */}
        <div className="card">
          <CardBotanicalAccent position="top-right" size="md" opacity={0.28} />
          <div className="card-header">
            <div className="card-title">
              <ShoppingBag size={18} color="var(--burgundy)" />
              <span>Platform Sales & Revenue Trajectory (Past 9 Days)</span>
            </div>
            <span style={{ fontSize: '0.75rem', background: 'var(--soft-blush-light)', border: '1px solid var(--soft-blush)', padding: '4px 8px', borderRadius: 6, color: 'var(--burgundy)', fontWeight: 600 }}>
              Simulated Telemetry
            </span>
          </div>
          <div className="card-body">
            <RevenueTrendChart data={salesTrend} height={230} />
          </div>
        </div>

        {/* Declining Stores Focus List */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <AlertTriangle size={18} color="var(--bright-red)" />
              <span>At-Risk Stores</span>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('stores')}>
              View All
            </button>
          </div>
          <div className="card-body" style={{ padding: '12px 18px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {decliningStores.slice(0, 3).map(store => (
                <div
                  key={store.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(166, 42, 67, 0.2)',
                    background: 'var(--bright-red-subtle)',
                    cursor: 'pointer'
                  }}
                  onClick={() => onSelectStore(store)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--burgundy)' }}>{store.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--bright-red)', fontWeight: 700 }}>
                      {store.revenueGrowth}%
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <span>Conversion: {store.conversionRate}%</span>
                    <span>Bounce: {store.bounceRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Pending Upgrades Pipeline & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
        {/* Core Workflow: Pending Website Upgrades */}
        <div className="card">
          <CardBotanicalAccent position="bottom-right" size="sm" opacity={0.2} />
          <div className="card-header">
            <div className="card-title">
              <Rocket size={18} color="var(--marine-blue)" />
              <span>Website Upgrade Workflow Pipeline</span>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('upgrades')}>
              Manage Upgrades
            </button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Optimization Proposal</th>
                  <th>Owner Approval</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {upgrades.slice(0, 4).map(u => (
                  <tr key={u.id}>
                    <td>
                      <strong>{u.storeName}</strong>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{u.title}</div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{u.category}</span>
                    </td>
                    <td>
                      <StatusBadge status={u.ownerApprovalStatus} />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onSelectUpgrade(u)}
                      >
                        Preview & Apply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Activity Feed */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CheckCircle2 size={18} color="#10B981" />
              <span>Recent Platform Events</span>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('logs')}>
              Full Logs
            </button>
          </div>
          <div className="card-body" style={{ padding: '14px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {activityLogs.slice(0, 5).map(log => (
                <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.82rem' }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    marginTop: 6,
                    background: log.status === 'success' ? '#10B981' : log.status === 'warning' ? 'var(--bright-red)' : 'var(--marine-blue)'
                  }} />
                  <div style={{ flex: 1 }}>
                    <div>
                      <strong>{log.actor}</strong>: {log.action}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>
                      {log.target} • {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Botanical Corner Flourish */}
      <BotanicalCornerFlourish corner="bottom-right" size="md" opacity={0.22} />
    </div>
  );
}
