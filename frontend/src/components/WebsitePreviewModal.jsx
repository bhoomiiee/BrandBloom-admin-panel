import React, { useState } from 'react';
import {
  X, CheckCircle, XCircle, Play, RotateCcw, AlertTriangle, Eye, Code,
  FileText, ShieldCheck, Clock, ExternalLink, Sparkles, Terminal
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import { BotanicalBannerFoliage } from './BotanicalDecorations';

export default function WebsitePreviewModal({
  upgrade,
  isOpen,
  onClose,
  onRecordOwnerDecision,
  onApplyUpgrade,
  onRollbackUpgrade,
  loading = false
}) {
  const [activeTab, setActiveTab] = useState('visual'); // 'visual', 'interactive', 'diff', 'audit'
  const [ownerDecisionNote, setOwnerDecisionNote] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentLogs, setDeploymentLogs] = useState([]);
  const [interactiveStep, setInteractiveStep] = useState('default');

  if (!isOpen || !upgrade) return null;

  const isApproved = upgrade.ownerApprovalStatus === 'Approved';
  const isRejected = upgrade.ownerApprovalStatus === 'Rejected';
  const isPendingApproval = upgrade.ownerApprovalStatus === 'Pending Approval';
  const isCompleted = upgrade.implementationStatus === 'Completed';

  const handleSimulateDecision = (decision) => {
    onRecordOwnerDecision(upgrade.id, decision, ownerDecisionNote);
  };

  const handleApply = async () => {
    if (!isApproved) return;
    setIsDeploying(true);
    setDeploymentLogs([
      '[00:01] 🚀 Initializing BrandBloom Automated Deployment Pipeline...',
      '[00:02] 🔒 Verifying cryptographic merchant owner signature...',
      '[00:03] 📦 Packaging optimized storefront components and assets...',
      '[00:04] 🧪 Running headless visual regression and responsive test suite... (PASS)',
      '[00:05] 🌐 Rebuilding edge cache and pushing changes to CDN...',
      '[00:06] ✅ Deployment verified! Storefront updated successfully (Simulation Environment).'
    ]);

    setTimeout(async () => {
      await onApplyUpgrade(upgrade.id);
      setIsDeploying(false);
    }, 1400);
  };

  const handleRollback = () => {
    onRollbackUpgrade(upgrade.id, 'Emergency rollback requested by administrator');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-xl" onClick={e => e.stopPropagation()} style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Header */}
        <div className="modal-header" style={{ background: 'var(--marine-blue-subtle)', position: 'relative', overflow: 'hidden' }}>
          <BotanicalBannerFoliage position="right" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span className="simulation-pill">
                <span className="icon-dot"></span> Verified Safe Simulation Sandbox
              </span>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--marine-blue)' }}>{upgrade.title}</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
              Target Store: <strong>{upgrade.storeName}</strong> • Request ID: <code>{upgrade.id}</code>
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} disabled={loading || isDeploying}>
            <X size={20} />
          </button>
        </div>

        {/* Status Bar */}
        <div style={{
          padding: '12px 24px',
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>
                1. Owner Approval Status
              </span>
              <StatusBadge status={upgrade.ownerApprovalStatus} />
            </div>

            <div style={{ height: 28, width: 1, background: 'var(--border-color)' }}></div>

            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>
                2. Live Implementation Status
              </span>
              <StatusBadge status={upgrade.implementationStatus} />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: 6, background: 'var(--soft-blush-light)', padding: 4, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              className={`btn btn-sm ${activeTab === 'visual' ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '6px 12px' }}
              onClick={() => setActiveTab('visual')}
            >
              <Eye size={14} /> Before vs After
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'interactive' ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '6px 12px' }}
              onClick={() => setActiveTab('interactive')}
            >
              <Sparkles size={14} /> Interactive Mockup
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'diff' ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '6px 12px' }}
              onClick={() => setActiveTab('diff')}
            >
              <Code size={14} /> Code Diff
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'audit' ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '6px 12px' }}
              onClick={() => setActiveTab('audit')}
            >
              <Clock size={14} /> Audit Trail ({upgrade.auditLogs?.length || 0})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="modal-body" style={{ minHeight: 380 }}>
          {/* TAB 1: Visual Comparison */}
          {activeTab === 'visual' && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--marine-blue-dark)' }}>
                  {upgrade.previewData?.summary || 'Proposed Storefront Optimization'}
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  {upgrade.description}
                </p>
              </div>

              {/* Side-by-side split */}
              <div className="preview-split">
                {/* BEFORE */}
                <div className="preview-box">
                  <div className="preview-box-header before">
                    <span>Current / Before (Unoptimized)</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--bright-red)', fontWeight: 700 }}>Bottleneck Detected</span>
                  </div>
                  <div className="preview-box-content">
                    <div style={{ background: '#FFFFFF', padding: 12, borderRadius: 6, border: '1px solid #E2E8F0', marginBottom: 10 }}>
                      <pre style={{ fontSize: '0.75rem', color: '#475569', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                        {upgrade.previewData?.beforeSnippet}
                      </pre>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <strong>Performance Snapshot:</strong>
                      <div style={{ marginTop: 4, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {upgrade.previewData?.beforeMetrics && Object.entries(upgrade.previewData.beforeMetrics).map(([k, v]) => (
                          <span key={k} style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: 4 }}>
                            {k}: <strong>{v}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AFTER */}
                <div className="preview-box">
                  <div className="preview-box-header after">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Sparkles size={14} color="var(--marine-blue)" /> BrandBloom AI Optimized
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>Projected +16% Lift</span>
                  </div>
                  <div className="preview-box-content">
                    <div style={{ background: '#FFFFFF', padding: 12, borderRadius: 6, border: '1px solid #BFDBFE', marginBottom: 10 }}>
                      <pre style={{ fontSize: '0.75rem', color: 'var(--marine-blue-dark)', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                        {upgrade.previewData?.afterSnippet}
                      </pre>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--marine-blue-dark)' }}>
                      <strong>Key Enhancements:</strong>
                      <ul style={{ paddingLeft: 16, marginTop: 4 }}>
                        {upgrade.previewData?.featuresAdded?.map((f, i) => (
                          <li key={i} style={{ marginBottom: 2 }}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Live Interactive Mockup */}
          {activeTab === 'interactive' && (
            <div style={{ border: '2px dashed #CBD5E1', borderRadius: 'var(--radius-lg)', padding: 24, background: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--marine-blue)' }}>
                    Simulated Merchant View: {upgrade.storeName}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Interact directly with the proposed component enhancement to test owner and shopper experience.
                  </p>
                </div>
                <span className="status-pill active">Interactive Sandbox Active</span>
              </div>

              {/* Interactive Demo Component Container */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: 24,
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-color)',
                maxWidth: 580,
                margin: '0 auto'
              }}>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 12, marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: 'var(--marine-blue)' }}>{upgrade.storeName}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cart Total: ₹5,680.00</span>
                </div>

                {interactiveStep === 'default' ? (
                  <div>
                    <p style={{ fontSize: '0.88rem', marginBottom: 16 }}>
                      Instant One-Click Checkout Upgrade (Apple Pay / Google Pay integration):
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <button
                        className="btn"
                        style={{ background: '#000000', color: '#FFFFFF', padding: 12, borderRadius: 8, fontSize: '0.9rem' }}
                        onClick={() => setInteractiveStep('success')}
                      >
                         Pay with Apple Pay
                      </button>

                      <button
                        className="btn"
                        style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#334155', padding: 12, borderRadius: 8, fontSize: '0.9rem' }}
                        onClick={() => setInteractiveStep('success')}
                      >
                        💳 Pay with Google Pay
                      </button>

                      <div style={{ textAlign: 'center', margin: '8px 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        — Or fast 1-step checkout with address autocomplete —
                      </div>

                      <input
                        type="text"
                        className="search-input"
                        placeholder="Start typing your street address..."
                        style={{ paddingLeft: 12 }}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <CheckCircle size={44} color="#10B981" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ color: 'var(--marine-blue)' }}>1-Click Checkout Completed!</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 16px' }}>
                      Shopper checkout completed in 18 seconds (vs previous 3m 48s baseline).
                    </p>
                    <button className="btn btn-outline btn-sm" onClick={() => setInteractiveStep('default')}>
                      Reset Simulation
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Code Diff */}
          {activeTab === 'diff' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Diff summary for automated release:</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Git ref: <code>bloom-patch-{upgrade.id}</code></span>
              </div>
              <div style={{ background: '#0F172A', color: '#E2E8F0', padding: 18, borderRadius: 'var(--radius-md)', overflowX: 'auto' }}>
                <pre style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                  {`// Proposed Patch: ${upgrade.title}
// Target Component: Storefront / Checkout / Layout
+ import { ExpressPayProvider } from '@brandbloom/commerce-sdk';
+ import { AddressAutocomplete } from '@brandbloom/geo';

- <form className="legacy-4step-checkout-form">
-   <AddressMultiStepStep1 />
-   <ShippingMethodStep2 />
- </form>
+ <ExpressPayProvider merchantId="${upgrade.storeId}" theme="marine-blue">
+   <ApplePayButton mode="direct" />
+   <GooglePayButton mode="direct" />
+   <AddressAutocomplete autoFillFields={['city', 'zip', 'state']} />
+ </ExpressPayProvider>

// Verified: Zero breaking database migrations required.`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: Audit Trail */}
          {activeTab === 'audit' && (
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 14 }}>
                Workflow Lifecycle & Verification History
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {upgrade.auditLogs?.map((log, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: 12,
                    background: '#F8FAFC',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <Clock size={16} color="var(--marine-blue)" style={{ marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{log.message}</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deployment terminal if deploying */}
          {isDeploying && (
            <div style={{ marginTop: 20, background: '#2B121B', color: 'var(--soft-blush)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--dusty-rose-dark)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: '0.85rem', fontWeight: 700, color: 'var(--soft-blush)' }}>
                <Terminal size={16} /> Deploying Website Changes to Merchant Store...
              </div>
              {deploymentLogs.map((log, index) => (
                <div key={index} style={{ fontSize: '0.78rem', fontFamily: 'monospace', opacity: 0.9 }}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WORKFLOW CONTROLS FOOTER */}
        <div className="modal-footer" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
          {/* STEP A: Simulate Store Owner Response (if still pending) */}
          {isPendingApproval && (
            <div style={{
              background: '#FFF7F0',
              border: '1px solid #F8DFC8',
              padding: 14,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap'
            }}>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#92400E', display: 'block' }}>
                  Step 4 of Core Workflow: Store Owner Decision Required
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#B45309' }}>
                  Simulate {upgrade.storeName} owner receiving this proposal and submitting their decision:
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Optional owner feedback note..."
                  value={ownerDecisionNote}
                  onChange={e => setOwnerDecisionNote(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #FCD34D',
                    width: 220
                  }}
                />
                <button
                  className="btn btn-sm"
                  style={{ background: '#10B981', color: '#FFFFFF' }}
                  onClick={() => handleSimulateDecision('Approved')}
                  disabled={loading}
                >
                  <CheckCircle size={14} /> Simulate Owner Approval
                </button>
                <button
                  className="btn btn-sm btn-accent"
                  onClick={() => handleSimulateDecision('Rejected')}
                  disabled={loading}
                >
                  <XCircle size={14} /> Simulate Rejection
                </button>
              </div>
            </div>
          )}

          {/* STEP B: Application & Deployment Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {!isApproved ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--bright-red)', fontWeight: 600 }}>
                  <AlertTriangle size={16} /> BrandBloom Security Guard: Cannot apply changes without verified owner authorization.
                </span>
              ) : isCompleted ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10B981', fontWeight: 600 }}>
                  <CheckCircle size={16} /> Changes successfully deployed to merchant storefront.
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--marine-blue)', fontWeight: 600 }}>
                  <ShieldCheck size={16} /> Owner approval verified. Ready for live storefront injection.
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {isCompleted && (
                <button
                  className="btn btn-danger-outline btn-sm"
                  onClick={handleRollback}
                  disabled={loading || isDeploying}
                >
                  <RotateCcw size={14} /> Instant Rollback Changes
                </button>
              )}

              <button className="btn btn-outline" onClick={onClose} disabled={isDeploying}>
                Close
              </button>

              <button
                className={`btn ${isApproved && !isCompleted ? 'btn-primary' : 'btn-outline'}`}
                onClick={handleApply}
                disabled={!isApproved || isCompleted || isDeploying || loading}
                title={!isApproved ? 'Requires Store Owner Approval first' : isCompleted ? 'Already applied' : 'Apply changes'}
                style={{
                  opacity: (!isApproved || isCompleted) ? 0.6 : 1,
                  cursor: (!isApproved || isCompleted) ? 'not-allowed' : 'pointer'
                }}
              >
                <Play size={15} />
                {isDeploying ? 'Deploying Changes...' : isCompleted ? 'Already Deployed' : 'Apply Upgrade to Live Store'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
