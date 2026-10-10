import React, { useState } from 'react';
import { Settings, Save, Sparkles, Shield, Bell, CheckCircle } from 'lucide-react';
import { CardBotanicalAccent, BotanicalCornerFlourish } from '../components/BotanicalDecorations';

export default function SettingsPage({
  settings = {},
  onSaveSettings,
  loading = false
}) {
  const [formData, setFormData] = useState({
    platformName: settings.general?.platformName || 'BrandBloom',
    adminEmail: settings.general?.adminEmail || 'admin@brandbloom.io',
    aiModel: settings.aiEngine?.model || 'BrandBloom Optima v2.4',
    decliningThresholdPercent: settings.aiEngine?.decliningThresholdPercent || 10,
    minConfidenceThreshold: settings.aiEngine?.minConfidenceThreshold || 85,
    autoScanFrequency: settings.aiEngine?.autoScanFrequency || 'daily',
    requireOwnerDoubleConfirm: settings.upgrades?.requireOwnerDoubleConfirm ?? true,
    enableInstantRollback: settings.upgrades?.enableInstantRollback ?? true,
    simulationMode: settings.upgrades?.simulationMode ?? true,
    emailOnOwnerDecision: settings.notifications?.emailOnOwnerDecision ?? true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      general: {
        platformName: formData.platformName,
        adminEmail: formData.adminEmail
      },
      aiEngine: {
        model: formData.aiModel,
        decliningThresholdPercent: Number(formData.decliningThresholdPercent),
        minConfidenceThreshold: Number(formData.minConfidenceThreshold),
        autoScanFrequency: formData.autoScanFrequency
      },
      upgrades: {
        requireOwnerDoubleConfirm: formData.requireOwnerDoubleConfirm,
        enableInstantRollback: formData.enableInstantRollback,
        simulationMode: formData.simulationMode
      },
      notifications: {
        emailOnOwnerDecision: formData.emailOnOwnerDecision
      }
    };

    await onSaveSettings(payload);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-box">
          <h1>Platform Settings & Safeguards</h1>
          <p>Configure AI optimization engine parameters, owner authorization policies, and system thresholds.</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="alert-banner info" style={{ marginBottom: 20 }}>
          <div className="alert-content">
            <CheckCircle size={20} color="var(--marine-blue)" />
            <span>Platform settings and AI configuration updated successfully!</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Section 1: AI Engine Configuration */}
          <div className="card">
            <CardBotanicalAccent position="top-right" size="sm" opacity={0.2} />
            <div className="card-header">
              <div className="card-title">
                <Sparkles size={18} color="var(--marine-blue)" />
                <span>AI Recommendation Engine (Optima-v2)</span>
              </div>
            </div>
            <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                  Active AI Model Version
                </label>
                <input
                  type="text"
                  className="search-input"
                  style={{ paddingLeft: 12 }}
                  value={formData.aiModel}
                  onChange={e => setFormData({ ...formData, aiModel: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                  Storefront Diagnostic Scan Frequency
                </label>
                <select
                  className="select-filter"
                  style={{ width: '100%' }}
                  value={formData.autoScanFrequency}
                  onChange={e => setFormData({ ...formData, autoScanFrequency: e.target.value })}
                >
                  <option value="hourly">Hourly (Real-time telemetry)</option>
                  <option value="daily">Daily (Recommended)</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                  Declining Revenue Alert Trigger (%)
                </label>
                <input
                  type="number"
                  className="search-input"
                  style={{ paddingLeft: 12 }}
                  value={formData.decliningThresholdPercent}
                  onChange={e => setFormData({ ...formData, decliningThresholdPercent: e.target.value })}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Triggers high-priority recommendation if store revenue drops by this percentage.
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                  Minimum Recommendation Confidence Score (0-100)
                </label>
                <input
                  type="number"
                  className="search-input"
                  style={{ paddingLeft: 12 }}
                  value={formData.minConfidenceThreshold}
                  onChange={e => setFormData({ ...formData, minConfidenceThreshold: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Owner Authorization & Core Workflow Safeguards */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Shield size={18} color="var(--marine-blue)" />
                <span>Website Upgrade Workflow & Authorization Rules</span>
              </div>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                  checked={formData.requireOwnerDoubleConfirm}
                  onChange={e => setFormData({ ...formData, requireOwnerDoubleConfirm: e.target.checked })}
                />
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--marine-blue-dark)' }}>
                    Mandatory Merchant Owner Approval Prior to Code Injection
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Blocks any administrator from applying changes to a storefront without explicit merchant owner approval status.
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                  checked={formData.enableInstantRollback}
                  onChange={e => setFormData({ ...formData, enableInstantRollback: e.target.checked })}
                />
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--marine-blue-dark)' }}>
                    Enable 1-Click Instant Rollback Capability
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Maintains pre-upgrade snapshots to revert deployed optimizations within seconds if needed.
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                  checked={formData.simulationMode}
                  onChange={e => setFormData({ ...formData, simulationMode: e.target.checked })}
                />
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--marine-blue-dark)' }}>
                    Safe Simulation Sandbox Environment (Active)
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Executes builds and displays simulated visual comparisons without altering external production servers.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Platform Information */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Settings size={18} color="var(--marine-blue)" />
                <span>General Platform Information</span>
              </div>
            </div>
            <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                  Platform Name
                </label>
                <input
                  type="text"
                  className="search-input"
                  style={{ paddingLeft: 12 }}
                  value={formData.platformName}
                  onChange={e => setFormData({ ...formData, platformName: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                  Platform SuperAdmin Contact Email
                </label>
                <input
                  type="email"
                  className="search-input"
                  style={{ paddingLeft: 12 }}
                  value={formData.adminEmail}
                  onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', background: '#F8FAFC' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <Save size={16} />
                {loading ? 'Saving...' : 'Save Configuration Changes'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Small Consistent Botanical Corner Flourish */}
      <BotanicalCornerFlourish corner="bottom-right" size="sm" opacity={0.18} />
    </div>
  );
}
