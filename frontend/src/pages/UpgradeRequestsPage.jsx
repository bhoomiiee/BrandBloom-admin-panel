import React, { useState } from 'react';
import {
  Rocket, Search, Filter, CheckCircle, XCircle, Play, Eye, RotateCcw,
  AlertTriangle, ShieldCheck, Clock, ExternalLink, HelpCircle
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { BotanicalBannerFoliage, CardBotanicalAccent, BotanicalCornerFlourish } from '../components/BotanicalDecorations';

export default function UpgradeRequestsPage({
  upgrades = [],
  onSelectUpgrade,
  onRecordOwnerDecision,
  onApplyUpgrade,
  onRollbackUpgrade,
  loading = false
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [implFilter, setImplFilter] = useState('all');

  const filteredUpgrades = upgrades.filter(u => {
    const matchesSearch =
      u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesOwner = ownerFilter === 'all' || u.ownerApprovalStatus === ownerFilter;
    const matchesImpl = implFilter === 'all' || u.implementationStatus === implFilter;

    return matchesSearch && matchesOwner && matchesImpl;
  });

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1>Website Upgrade Requests</h1>
            <span className="simulation-pill">
              <span className="icon-dot"></span> Core Workflow
            </span>
          </div>
          <p>
            Track merchant improvement proposals, verified owner authorization, and simulated live deployment.
          </p>
        </div>
      </div>

      {/* Core Workflow Explanation Banner */}
      <div className="card" style={{ marginBottom: 24, background: 'linear-gradient(135deg, var(--soft-blush-light) 0%, #FFFFFF 100%)', borderColor: 'var(--soft-blush)', position: 'relative', overflow: 'hidden' }}>
        <BotanicalBannerFoliage position="right" />
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ShieldCheck size={28} color="var(--burgundy)" />
            <div>
              <strong style={{ fontSize: '0.92rem', color: 'var(--burgundy)' }}>
                Owner-Approved Website Improvement Architecture
              </strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: 2 }}>
                1. AI Detects Issue ➔ 2. Recommendation Created ➔ 3. Proposal Sent ➔ 4. <strong>Owner Approval Required</strong> ➔ 5. Live Store Deployment
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: '#FFFFFF', padding: '6px 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
            Strict policy: Store modifications require owner approval prior to injection.
          </div>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="card" style={{ marginBottom: 24, padding: 18, position: 'relative', overflow: 'hidden' }}>
        <CardBotanicalAccent position="top-right" size="sm" opacity={0.2} />
        <div className="filter-bar" style={{ margin: 0 }}>
          <div className="search-input-wrap">
            <Search size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search upgrade requests by title or store..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-actions">
            <select
              className="select-filter"
              value={ownerFilter}
              onChange={e => setOwnerFilter(e.target.value)}
            >
              <option value="all">All Owner Statuses</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              className="select-filter"
              value={implFilter}
              onChange={e => setImplFilter(e.target.value)}
            >
              <option value="all">All Implementation States</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table of Upgrade Requests */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Upgrade Proposal</th>
              <th>Target Store</th>
              <th>Owner Approval Status</th>
              <th>Implementation Status</th>
              <th>Proposed Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUpgrades.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  No website upgrade requests match the filters.
                </td>
              </tr>
            ) : (
              filteredUpgrades.map(upgrade => {
                const isApproved = upgrade.ownerApprovalStatus === 'Approved';
                const isCompleted = upgrade.implementationStatus === 'Completed';

                return (
                  <tr key={upgrade.id}>
                    <td>
                      <div>
                        <strong
                          style={{ color: 'var(--marine-blue-dark)', cursor: 'pointer', fontSize: '0.92rem' }}
                          onClick={() => onSelectUpgrade(upgrade)}
                        >
                          {upgrade.title}
                        </strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {upgrade.description}
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong style={{ color: 'var(--text-primary)' }}>{upgrade.storeName}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ID: {upgrade.storeId}</div>
                    </td>

                    <td>
                      <StatusBadge status={upgrade.ownerApprovalStatus} />
                      {upgrade.ownerNotes && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2, fontStyle: 'italic', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          Note: "{upgrade.ownerNotes}"
                        </div>
                      )}
                    </td>

                    <td>
                      <StatusBadge status={upgrade.implementationStatus} />
                    </td>

                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {new Date(upgrade.proposedAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => onSelectUpgrade(upgrade)}
                          title="Open Interactive Preview & Sandbox"
                        >
                          <Eye size={13} />
                          Preview & Sandbox
                        </button>

                        {isApproved && !isCompleted && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => onSelectUpgrade(upgrade)}
                            title="Ready to apply to live storefront"
                          >
                            <Play size={13} />
                            Deploy
                          </button>
                        )}

                        {isCompleted && upgrade.rollbackAvailable && (
                          <button
                            className="btn btn-danger-outline btn-sm"
                            onClick={() => onRollbackUpgrade(upgrade.id, 'Admin requested rollback')}
                            title="Rollback storefront changes"
                          >
                            <RotateCcw size={13} />
                            Rollback
                          </button>
                        )}
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
