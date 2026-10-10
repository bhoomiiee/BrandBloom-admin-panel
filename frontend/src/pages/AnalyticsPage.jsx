import React, { useState } from 'react';
import {
  BarChart3, Download, TrendingUp, DollarSign, Store, CheckCircle,
  FileSpreadsheet, ArrowUpRight, ShieldCheck, PieChart
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { RevenueTrendChart, CategoryBarChart } from '../components/SimpleChart';
import { CardBotanicalAccent, BotanicalCornerFlourish } from '../components/BotanicalDecorations';

export default function AnalyticsPage({ analyticsData = {}, onExportReport }) {
  const [timeRange, setTimeRange] = useState('30d');

  const {
    storeStats = {},
    recStats = {},
    upgStats = {},
    salesTrend = [],
    registrationGrowth = [],
    categoryDistribution = [],
    performanceSummary = {}
  } = analyticsData;

  const handleExport = (type) => {
    // Generate CSV or JSON export file download
    const exportData = {
      generatedAt: new Date().toISOString(),
      timeRange,
      storeStats,
      recStats,
      upgStats,
      categoryDistribution
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brandbloom-analytics-report-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-box">
          <h1>Analytics & Intelligence Reports</h1>
          <p>Holistic metrics across merchant stores, revenue trends, and AI recommendation effectiveness.</p>
        </div>
        <div className="page-actions">
          <div style={{ display: 'flex', gap: 6, background: '#FFFFFF', padding: 4, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {['7d', '30d', '90d'].map(r => (
              <button
                key={r}
                className={`btn btn-sm ${timeRange === r ? 'btn-primary' : 'btn-outline'}`}
                style={{ border: 'none', padding: '4px 10px' }}
                onClick={() => setTimeRange(r)}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button className="btn btn-outline" onClick={() => handleExport('json')}>
            <Download size={16} /> Export JSON Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <MetricCard
          title="Recommendation Acceptance Rate"
          value={`${performanceSummary.recommendationAcceptanceRate || 67}%`}
          trend={14.2}
          trendLabel="owner adoption"
          icon={CheckCircle}
          highlight="yellow"
          description="Merchant owners approving AI changes"
        />

        <MetricCard
          title="Upgrade Completion Rate"
          value={`${performanceSummary.upgradeCompletionRate || 50}%`}
          trendLabel="verified deployments"
          icon={TrendingUp}
          highlight="blue"
          description="Pushed to live storefronts"
        />

        <MetricCard
          title="Average Store Health Score"
          value={`${storeStats.avgHealthScore || 74}/100`}
          trend={3.5}
          trendLabel="improved across platform"
          icon={ShieldCheck}
          highlight="blue"
          description="Based on bounce, speed & orders"
        />

        <MetricCard
          title="Platform Average Conversion"
          value={`${storeStats.avgConversionRate || 2.41}%`}
          trend={0.6}
          trendLabel="benchmark +0.6%"
          icon={BarChart3}
          highlight="blue"
          description="Aggregate store conversion"
        />
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 28 }}>
        {/* Sales Trend Chart */}
        <div className="card">
          <CardBotanicalAccent position="top-right" size="sm" opacity={0.2} />
          <div className="card-header">
            <div className="card-title">
              <DollarSign size={18} color="var(--marine-blue)" />
              <span>Platform Sales Velocity Over Time</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Aggregate Gross GMV</span>
          </div>
          <div className="card-body">
            <RevenueTrendChart data={salesTrend} height={260} />
          </div>
        </div>

        {/* Category Revenue Breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <PieChart size={18} color="var(--marine-blue)" />
              <span>Revenue by Merchant Category</span>
            </div>
          </div>
          <div className="card-body">
            <CategoryBarChart data={categoryDistribution} />
          </div>
        </div>
      </div>

      {/* Registrations & Store Health Breakdown Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Store Registrations Trajectory */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Store size={18} color="var(--marine-blue)" />
              <span>Merchant Onboarding Growth</span>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10B981' }}>+233% H2 Growth</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, paddingTop: 20 }}>
              {registrationGrowth.map((item, idx) => {
                const heightPercent = (item.count / 10) * 100;
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--marine-blue-dark)', marginBottom: 6 }}>
                      {item.count}
                    </span>
                    <div
                      style={{
                        width: 28,
                        height: `${heightPercent}%`,
                        background: idx === registrationGrowth.length - 1 ? 'var(--burgundy)' : 'var(--dusty-rose)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease'
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Optimization Efficiency Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CheckCircle size={18} color="var(--dusty-rose)" />
              <span>AI Optima-v2 Pipeline Metrics</span>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'var(--warm-off-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.85rem' }}>Total AI Recommendations Generated:</span>
                <strong>{recStats.total || 6}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'var(--warm-off-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.85rem' }}>Proposals Pushed to Store Owners:</span>
                <strong>{upgStats.total || 3}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'var(--warm-off-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.85rem' }}>Merchant Owner Approvals:</span>
                <strong style={{ color: 'var(--dusty-rose-dark)' }}>{upgStats.approved || 2}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'var(--warm-off-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.85rem' }}>Zero-Downtime Deployments Applied:</span>
                <strong style={{ color: 'var(--burgundy)' }}>{upgStats.completed || 1}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restrained Botanical Corner Flourish */}
      <BotanicalCornerFlourish corner="bottom-right" size="sm" opacity={0.18} />
    </div>
  );
}
