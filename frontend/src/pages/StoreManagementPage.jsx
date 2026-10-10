import React, { useState } from 'react';
import {
  Store, Search, Filter, ArrowUpDown, PlusCircle, ExternalLink,
  Sparkles, MoreVertical, AlertTriangle, Eye, ShieldCheck, ShieldAlert
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { CardBotanicalAccent, BotanicalCornerFlourish } from '../components/BotanicalDecorations';

export default function StoreManagementPage({
  stores = [],
  onSelectStore,
  onOpenCreateModal,
  onChangeStatus,
  onRunAiScan,
  aiScanning = false
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('growth-asc'); // default: declining first

  // Filter and sort stores
  const filteredStores = stores.filter(store => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || store.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'growth-asc') return a.revenueGrowth - b.revenueGrowth;
    if (sortBy === 'revenue-desc') return b.monthlyRevenue - a.monthlyRevenue;
    if (sortBy === 'health-desc') return b.healthScore - a.healthScore;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  const categories = Array.from(new Set(stores.map(s => s.category)));

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-box">
          <h1>Store Management</h1>
          <p>Monitor registered merchant storefronts, operational statuses, and commercial performance.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={onOpenCreateModal}>
            <PlusCircle size={16} />
            Register Store
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="card" style={{ marginBottom: 24, padding: 18 }}>
        <CardBotanicalAccent position="top-right" size="sm" opacity={0.2} />
        <div className="filter-bar" style={{ margin: 0 }}>
          {/* Search box */}
          <div className="search-input-wrap">
            <Search size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by store name, owner, or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter options */}
          <div className="filter-actions">
            <select
              className="select-filter"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="declining">Declining Sales</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <select
              className="select-filter"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              className="select-filter"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="growth-asc">Sort: Declining First</option>
              <option value="revenue-desc">Sort: Highest Revenue</option>
              <option value="health-desc">Sort: Highest Health Score</option>
              <option value="name-asc">Sort: Store Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stores Table */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Storefront</th>
              <th>Owner & Plan</th>
              <th>Category</th>
              <th>Status</th>
              <th>Monthly Revenue</th>
              <th>Growth MoM</th>
              <th>Conversion</th>
              <th>Health</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  No stores match the current filters.
                </td>
              </tr>
            ) : (
              filteredStores.map(store => {
                const isDeclining = store.revenueGrowth < 0;

                return (
                  <tr key={store.id}>
                    {/* Store Name & Link */}
                    <td>
                      <div>
                        <strong
                          style={{ color: 'var(--marine-blue-dark)', cursor: 'pointer', fontSize: '0.92rem' }}
                          onClick={() => onSelectStore(store)}
                        >
                          {store.name}
                        </strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <a
                            href={store.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                            onClick={e => e.stopPropagation()}
                          >
                            {store.slug}.brandbloom.store
                          </a>
                          <ExternalLink size={10} />
                        </div>
                      </div>
                    </td>

                    {/* Owner & Plan */}
                    <td>
                      <div style={{ fontWeight: 600 }}>{store.ownerName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {store.plan} Plan
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span style={{ fontSize: '0.82rem', background: '#F1F5F9', padding: '3px 8px', borderRadius: 4 }}>
                        {store.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <StatusBadge status={store.status} />
                    </td>

                    {/* Monthly Revenue */}
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--marine-blue-dark)' }}>
                        ₹{store.monthlyRevenue?.toLocaleString('en-IN')}
                      </span>
                    </td>

                    {/* Growth */}
                    <td>
                      <span style={{
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        color: isDeclining ? 'var(--bright-red)' : '#10B981'
                      }}>
                        {isDeclining ? '' : '+'}{store.revenueGrowth}%
                      </span>
                    </td>

                    {/* Conversion Rate */}
                    <td>
                      <span>{store.conversionRate}%</span>
                    </td>

                    {/* Health Score */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: store.healthScore < 70 ? 'var(--bright-red)' : '#10B981'
                        }} />
                        <span style={{ fontWeight: 600 }}>{store.healthScore}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => onSelectStore(store)}
                          title="View Store Details"
                        >
                          <Eye size={13} /> Details
                        </button>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => onRunAiScan(store.id)}
                          disabled={aiScanning}
                          title="Run AI Optimization Scan"
                        >
                          <Sparkles size={13} /> AI Scan
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Subtle Botanical Corner Flourish */}
      <BotanicalCornerFlourish corner="bottom-right" size="sm" opacity={0.2} />
    </div>
  );
}
