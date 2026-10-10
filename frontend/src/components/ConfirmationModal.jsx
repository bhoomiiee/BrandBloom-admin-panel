import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel,
  loading = false
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isDanger && <AlertTriangle size={20} color="var(--bright-red)" />}
            <h3 style={{ fontSize: '1.15rem' }}>{title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onCancel} disabled={loading}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {message}
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel} disabled={loading}>
            {cancelText}
          </button>
          <button
            className={`btn ${isDanger ? 'btn-accent' : 'btn-primary'}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
