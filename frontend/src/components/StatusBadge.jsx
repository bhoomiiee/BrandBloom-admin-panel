import React from 'react';

export default function StatusBadge({ status, type = 'store' }) {
  if (!status) return null;

  const normalized = status.toLowerCase().replace(/\s+/g, '-');

  // Human friendly labels
  const labelMap = {
    'active': 'Active',
    'declining': 'Declining Sales',
    'inactive': 'Inactive',
    'suspended': 'Suspended',
    'pending': 'Pending',
    'pending-approval': 'Pending Approval',
    'approved': 'Approved',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'rejected': 'Rejected',
    'failed': 'Failed',
    'pushed_to_owner': 'Sent to Owner',
    'reviewed': 'Reviewed'
  };

  const label = labelMap[normalized] || status;

  return (
    <span className={`status-pill ${normalized}`}>
      <span className="dot" style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        display: 'inline-block'
      }}></span>
      {label}
    </span>
  );
}
