import React, { useState } from 'react';
import {
  Sparkles, Search, Filter, ArrowRight, Send, CheckCircle,
  AlertCircle, BarChart3, Plus, ExternalLink
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { PetalAccentCluster, CardBotanicalAccent, BotanicalCornerFlourish } from '../components/BotanicalDecorations';

export default function RecommendationsPage({
  recommendations = [],
  stores = [],
  onSelectRec,
  onPushToOwner,
  onGenerateRec,
  loading = false
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStoreIdForGen, setSelectedStoreIdForGen] = useState(stores[0]?.id || '');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredRecs = recommendations.filter(rec => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.identifiedIssue.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = priorityFilter === 'all' || rec.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || rec.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleGenerate = async () => {
    if (!selectedStoreIdForGen) return;
    setIsGenerating(true);
    await onGenerateRec(selectedStoreIdForGen);
    setIsGenerating(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-box">
          <h1>AI Store Recommendations</h1>
          <p>Machine learning performance diagnostics, identified bottlenecks, and high-impact website improvements.</p>
        </div>

        {/* Generate recommendation on demand */}
        <div className="page-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', padding: '4px 6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <select
              className="select-filter"
              style={{ border: 'none', padding: '6px 10px', fontSize: '0.82rem' }}
              value={selectedStoreIdForGen}
              onChange={e => setSelectedStoreIdForGen(e.target.value)}
            >
              {stores.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.revenueGrowth < 0 ? 'Declining' : 'Active'})
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleGenerate}
              disabled={isGenerating || loading}
            >
              <Sparkles size={14} />
              {isGenerating ? 'AI Scanning...' : 'Run Diagnostics'}
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: 24, padding: 18 }}>
        <CardBotanicalAccent position="top-right" size="sm" opacity={0.22} />
        <div className="filter-bar" style={{ margin: 0 }}>
          <div className="search-input-wrap">
            <Search size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search recommendations by issue, store, or suggestion..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-actions">
            <select
              className="select-filter"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <select
              className="select-filter"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Workflow States</option>
              <option value="pending">Pending Admin Review</option>
              <option value="pushed_to_owner">Pushed to Owner</option>
              <option value="implemented">Implemented</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
        {filteredRecs.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
            No recommendations match your selected filters.
          </div>
        ) : (
          filteredRecs.map(rec => {
            const isHighPriority = rec.priority === 'High';
            const isPushed = rec.status === 'pushed_to_owner' || rec.status === 'implemented';

            return (
              <div key={rec.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <PetalAccentCluster position="top-right" size="sm" opacity={0.24} />
                <div className="card-header" style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="status-pill" style={{
                      background: isHighPriority ? 'var(--bright-red-subtle)' : 'var(--soft-blush-light)',
                      color: isHighPriority ? 'var(--bright-red)' : 'var(--burgundy)',
                      border: '1px solid currentColor'
                    }}>
                      {rec.priority}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rec.category}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Impact:</span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--burgundy)' }}>{rec.impactScore}/100</strong>
                  </div>
                </div>

                <div className="card-body" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <h3
                      style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--burgundy)', cursor: 'pointer', lineHeight: 1.4 }}
                      onClick={() => onSelectRec(rec)}
                    >
                      {rec.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--dusty-rose-dark)', fontWeight: 600, marginTop: 4 }}>
                      Store: {rec.storeName}
                    </div>
                  </div>

                  {/* Bottleneck summary */}
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)', background: 'var(--warm-off-white)', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <strong style={{ color: 'var(--bright-red)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: 2 }}>
                      Bottleneck Identified:
                    </strong>
                    {rec.identifiedIssue}
                  </div>

                  {/* Expected impact */}
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Projected Uplift: </span>
                    {rec.expectedImpact}
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <StatusBadge status={rec.status} />

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => onSelectRec(rec)}
                      >
                        Inspect
                      </button>

                      {!isPushed ? (
                        <button
                          className="btn btn-accent btn-sm"
                          onClick={() => onPushToOwner(rec.id)}
                          disabled={loading}
                          title="Creates Website Upgrade Request for Owner Approval"
                        >
                          <Send size={13} />
                          Dispatch to Owner
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                          <CheckCircle size={14} /> Dispatched
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delicate Botanical Corner Flourish */}
      <BotanicalCornerFlourish corner="bottom-right" size="sm" opacity={0.2} />
    </div>
  );
}
