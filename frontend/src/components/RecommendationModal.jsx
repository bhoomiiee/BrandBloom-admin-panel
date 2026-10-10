import React from 'react';
import { X, Sparkles, Send, CheckCircle, AlertCircle, BarChart3, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { PetalAccentCluster } from './BotanicalDecorations';

export default function RecommendationModal({
  rec,
  isOpen,
  onClose,
  onPushToOwner,
  onUpdateStatus,
  loading = false
}) {
  if (!isOpen || !rec) return null;

  const isAlreadyPushed = rec.status === 'pushed_to_owner' || rec.status === 'implemented';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={e => e.stopPropagation()} style={{ position: 'relative', overflow: 'hidden' }}>
        <PetalAccentCluster position="top-right" size="sm" opacity={0.25} />
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span className="status-pill" style={{
                background: rec.priority === 'High' ? 'var(--bright-red-subtle)' : 'var(--soft-blush-light)',
                color: rec.priority === 'High' ? 'var(--bright-red)' : 'var(--burgundy)',
                border: '1px solid currentColor'
              }}>
                {rec.priority} Priority
              </span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--burgundy)' }}>{rec.title}</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
              Target Store: <strong>{rec.storeName}</strong> • Category: {rec.category}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} disabled={loading}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Top Score Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            background: 'var(--warm-off-white)',
            padding: 16,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>AI Impact Score</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--burgundy)' }}>
                {rec.impactScore} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ 100</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Implementation Effort</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark-text)', marginTop: 2 }}>
                {rec.effort || 'Low'}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Workflow State</span>
              <div style={{ marginTop: 4 }}>
                <StatusBadge status={rec.status} />
              </div>
            </div>
          </div>

          {/* Issue Section */}
          <div style={{ borderLeft: '4px solid var(--bright-red)', paddingLeft: 14 }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertCircle size={16} color="var(--bright-red)" /> Identified Bottleneck
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {rec.identifiedIssue}
            </p>
          </div>

          {/* Supporting Evidence Metrics */}
          {rec.supportingMetrics && (
            <div style={{ background: 'var(--soft-blush-light)', border: '1px solid var(--soft-blush)', padding: 14, borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--burgundy)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <BarChart3 size={15} color="var(--dusty-rose-dark)" /> Supporting Data Evidence
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {Object.entries(rec.supportingMetrics).map(([key, val]) => (
                  <div key={key} style={{ fontSize: '0.82rem', color: 'var(--dark-text)' }}>
                    • <strong>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Proposed Solution */}
          <div style={{ borderLeft: '4px solid var(--dusty-rose)', paddingLeft: 14 }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={16} color="var(--dusty-rose)" /> Suggested Improvement
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {rec.suggestedImprovement}
            </p>
          </div>

          {/* Expected Outcome */}
          <div style={{ background: 'var(--warm-off-white)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--burgundy)', marginBottom: 4 }}>
              Expected Commercial Impact:
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--burgundy)', fontWeight: 600 }}>
              {rec.expectedImpact}
            </p>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            {rec.status === 'pending' && (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => onUpdateStatus(rec.id, 'dismissed')}
                disabled={loading}
              >
                Dismiss Recommendation
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" onClick={onClose} disabled={loading}>
              Close
            </button>

            {!isAlreadyPushed ? (
              <button
                className="btn btn-accent"
                onClick={() => onPushToOwner(rec.id)}
                disabled={loading}
              >
                <Send size={15} />
                {loading ? 'Dispatching...' : 'Dispatch Proposal to Store Owner'}
              </button>
            ) : (
              <button className="btn btn-outline" disabled style={{ opacity: 0.8 }}>
                <CheckCircle size={15} color="#10B981" />
                {rec.status === 'implemented' ? 'Already Implemented' : 'Proposal Sent to Owner'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
