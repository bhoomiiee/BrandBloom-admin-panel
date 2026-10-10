import React, { useState } from 'react';
import {
  Bell, Clock, CheckCheck, Filter, Search, CheckCircle2,
  AlertTriangle, ShieldCheck, Info, Sparkles, Rocket
} from 'lucide-react';
import { CardBotanicalAccent, BotanicalCornerFlourish } from '../components/BotanicalDecorations';

export default function NotificationsLogsPage({
  notifications = [],
  activityLogs = [],
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('notifications'); // 'notifications' or 'logs'
  const [logSearch, setLogSearch] = useState('');
  const [logStatusFilter, setLogStatusFilter] = useState('all');

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch =
      log.actor.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.action.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.target.toLowerCase().includes(logSearch.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(logSearch.toLowerCase()));

    const matchesStatus = logStatusFilter === 'all' || log.status === logStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-box">
          <h1>Notifications & Audit Logs</h1>
          <p>Real-time merchant alerts, owner decisions, and system verification audit trail.</p>
        </div>

        <div className="page-actions">
          <div style={{ display: 'flex', gap: 6, background: '#FFFFFF', padding: 4, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              className={`btn btn-sm ${activeTab === 'notifications' ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none' }}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={14} /> Notifications ({notifications.filter(n => !n.read).length} unread)
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'logs' ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none' }}
              onClick={() => setActiveTab('logs')}
            >
              <Clock size={14} /> Audit Trail ({activityLogs.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="card">
          <CardBotanicalAccent position="top-right" size="sm" opacity={0.2} />
          <div className="card-header">
            <div className="card-title">
              <Bell size={18} color="var(--burgundy)" />
              <span>Platform Alerts & Updates</span>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={onMarkAllNotificationsRead}
            >
              <CheckCheck size={14} /> Mark All as Read
            </button>
          </div>

          <div className="card-body" style={{ padding: 0 }}>
            {notifications.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                No notifications right now.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {notifications.map(n => {
                  const isApproval = n.type === 'approval';
                  const isAlert = n.type === 'alert';
                  const isUpgrade = n.type === 'upgrade';

                  return (
                    <div
                      key={n.id}
                      style={{
                        padding: '16px 24px',
                        borderBottom: '1px solid var(--border-subtle)',
                        background: n.read ? '#FFFFFF' : 'var(--soft-blush-light)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 16
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                        <div style={{
                          width: 36,
                          height: 36,
                          borderRadius: 'var(--radius-md)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 2,
                          background: isApproval ? 'var(--soft-blush)' : isAlert ? 'var(--bright-red-subtle)' : isUpgrade ? 'var(--status-active-bg)' : 'var(--warm-off-white)',
                          color: isApproval ? 'var(--burgundy)' : isAlert ? 'var(--bright-red)' : isUpgrade ? 'var(--status-active-text)' : 'var(--muted-text)',
                          border: '1px solid var(--border-color)'
                        }}>
                          {isApproval && <ShieldCheck size={18} />}
                          {isAlert && <AlertTriangle size={18} />}
                          {isUpgrade && <Rocket size={18} />}
                          {!isApproval && !isAlert && !isUpgrade && <Info size={18} />}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <strong style={{ fontSize: '0.92rem', color: 'var(--burgundy)' }}>{n.title}</strong>
                            {!n.read && (
                              <span style={{ fontSize: '0.68rem', background: 'var(--bright-red)', color: '#FFFFFF', padding: '1px 6px', borderRadius: 999, fontWeight: 700 }}>
                                NEW
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: 4 }}>
                            {n.message}
                          </p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, display: 'inline-block' }}>
                            {new Date(n.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {n.link && (
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => onNavigate(n.link.replace('/', ''))}
                          >
                            View
                          </button>
                        )}
                        {!n.read && (
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => onMarkNotificationRead(n.id)}
                            title="Mark as read"
                          >
                            <CheckCheck size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div>
          {/* Filter Bar */}
          <div className="card" style={{ marginBottom: 20, padding: 16 }}>
            <div className="filter-bar" style={{ margin: 0 }}>
              <div className="search-input-wrap">
                <Search size={16} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Filter logs by actor, action, or target..."
                  value={logSearch}
                  onChange={e => setLogSearch(e.target.value)}
                />
              </div>

              <div className="filter-actions">
                <select
                  className="select-filter"
                  value={logStatusFilter}
                  onChange={e => setLogStatusFilter(e.target.value)}
                >
                  <option value="all">All Outcomes</option>
                  <option value="success">Success</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Actor / Agent</th>
                  <th>Action</th>
                  <th>Target Entity</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                      No activity logs match the criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log.id}>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td>
                        <strong style={{ fontSize: '0.85rem' }}>{log.actor}</strong>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--marine-blue)' }}>
                          {log.action}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                          {log.target}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {log.details || '—'}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 999,
                          textTransform: 'uppercase',
                          background: log.status === 'success' ? '#ECFDF5' : log.status === 'warning' ? '#FEF2F2' : '#F1F5F9',
                          color: log.status === 'success' ? '#065F46' : log.status === 'warning' ? '#991B1B' : '#334155'
                        }}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Small Consistent Botanical Corner Flourish */}
      <BotanicalCornerFlourish corner="bottom-right" size="sm" opacity={0.2} />
    </div>
  );
}
