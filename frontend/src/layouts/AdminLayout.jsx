import React, { useState } from 'react';
import {
  LayoutDashboard, Store, Sparkles, Rocket, BarChart3, Bell, Settings,
  Menu, X, Search, Check, ShieldAlert, ExternalLink, HelpCircle
} from 'lucide-react';
import {
  BotanicalDefs,
  SidebarBotanicalIllustration,
  HeaderBotanicalFoliage,
  BotanicalFooter,
  OrganicBackgroundCurves,
  BotanicalCornerFlourish
} from '../components/BotanicalDecorations';

export default function AdminLayout({
  activeTab,
  onNavigate,
  unreadCount = 0,
  notifications = [],
  onMarkNotificationRead,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stores', label: 'Store Management', icon: Store },
    { id: 'recommendations', label: 'AI Recommendations', icon: Sparkles, badge: 'AI', badgeClass: 'highlight' },
    { id: 'upgrades', label: 'Website Upgrades', icon: Rocket, badge: 'Core', badgeClass: 'danger' },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'logs', label: 'Notifications & Logs', icon: Bell, badgeCount: unreadCount },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="admin-app">
      {/* Central Botanical Gradient Defs */}
      <BotanicalDefs />

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-badge" onClick={() => handleNavClick('dashboard')} style={{ cursor: 'pointer' }}>
            <div className="brand-icon-wrapper">
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>🌸</span>
            </div>
            <div>
              <div className="brand-title">
                Brand<span>Bloom</span>
              </div>
              <div className="brand-tagline">Admin Suite</div>
            </div>
          </div>
          {mobileMenuOpen && (
            <button className="modal-close-btn" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFFFFF' }}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Store Management & AI</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`nav-badge ${item.badgeClass}`}>{item.badge}</span>
                )}
                {item.badgeCount > 0 && (
                  <span className="nav-badge danger">{item.badgeCount}</span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Large Botanical Illustration along bottom-left portion of sidebar */}
        <SidebarBotanicalIllustration />

        <div className="sidebar-footer">
          <div className="sidebar-status-card">
            <div className="status-indicator">
              <div className="pulse-dot"></div>
              <span>Simulation Engine Active</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', margin: '4px 0 0' }}>
              Owner-approval required for storefront modifications.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Subtle Organic Background Curves */}
        <OrganicBackgroundCurves />

        {/* Top Header */}
        <header className="topbar">
          {/* Decorative foliage in the top-right header area */}
          <HeaderBotanicalFoliage />

          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={22} />
            </button>
            <div className="breadcrumb-area">
              <span>BrandBloom</span>
              <span>/</span>
              <strong style={{ textTransform: 'capitalize' }}>
                {activeTab.replace('-', ' ')}
              </strong>
            </div>
          </div>

          <div className="topbar-right">
            {/* Simulation Badge */}
            <div className="simulation-pill">
              <span className="icon-dot"></span>
              <span>Simulated Data Mode</span>
            </div>

            {/* Notification Bell Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className="icon-button"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                title="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && <span className="icon-badge">{unreadCount}</span>}
              </button>

              {notifDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 48,
                  right: 0,
                  width: 340,
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--border-color)',
                  zIndex: 60,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--burgundy)' }}>Notifications</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{unreadCount} unread</span>
                  </div>

                  <div style={{ maxHeight: 260, overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: 16, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                        No notifications
                      </div>
                    ) : (
                      notifications.slice(0, 4).map(n => (
                        <div
                          key={n.id}
                          style={{
                            padding: '10px 16px',
                            borderBottom: '1px solid var(--border-subtle)',
                            background: n.read ? '#FFFFFF' : 'var(--soft-blush-light)',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            onMarkNotificationRead(n.id);
                            onNavigate('logs');
                            setNotifDropdownOpen(false);
                          }}
                        >
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--burgundy)' }}>{n.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{n.message}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ padding: '8px 16px', background: 'var(--warm-off-white)', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
                    <button
                      className="btn btn-outline btn-sm"
                      style={{ border: 'none', width: '100%' }}
                      onClick={() => {
                        onNavigate('logs');
                        setNotifDropdownOpen(false);
                      }}
                    >
                      View All Alerts & Activity Logs
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="admin-profile-btn">
              <div className="avatar">AD</div>
              <span className="admin-name">Admin Portal</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="page-container">
          {children}
        </main>

        {/* Botanical Footer with Flowing Shapes & Small Leaves */}
        <BotanicalFooter />
      </div>
    </div>
  );
}
