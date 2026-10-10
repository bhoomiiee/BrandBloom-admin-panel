import React, { useState, useEffect } from 'react';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import StoreManagementPage from './pages/StoreManagementPage';
import RecommendationsPage from './pages/RecommendationsPage';
import UpgradeRequestsPage from './pages/UpgradeRequestsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotificationsLogsPage from './pages/NotificationsLogsPage';
import SettingsPage from './pages/SettingsPage';

// Components & Modals
import StoreModal from './components/StoreModal';
import StoreDetailModal from './components/StoreDetailModal';
import RecommendationModal from './components/RecommendationModal';
import WebsitePreviewModal from './components/WebsitePreviewModal';
import ConfirmationModal from './components/ConfirmationModal';

// Services
import { storeService } from './services/storeService';
import { recommendationService } from './services/recommendationService';
import { upgradeService } from './services/upgradeService';
import { analyticsService } from './services/analyticsService';
import { notificationService } from './services/notificationService';
import { settingsService } from './services/settingsService';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [stores, setStores] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [upgrades, setUpgrades] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [settings, setSettings] = useState({});

  // Modals & Interactivity states
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedRec, setSelectedRec] = useState(null);
  const [selectedUpgrade, setSelectedUpgrade] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null, isDanger: false });
  const [toasts, setToasts] = useState([]);
  const [aiScanning, setAiScanning] = useState(false);

  // Toast dispatcher
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Initial Data Fetch
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        storesRes,
        recsRes,
        upgradesRes,
        analyticsRes,
        notifsRes,
        logsRes,
        settingsRes
      ] = await Promise.all([
        storeService.getStores(),
        recommendationService.getRecommendations(),
        upgradeService.getUpgrades(),
        analyticsService.getOverview(),
        notificationService.getNotifications(),
        notificationService.getActivityLogs(),
        settingsService.getSettings()
      ]);

      if (storesRes.data) setStores(storesRes.data);
      if (recsRes.data) setRecommendations(recsRes.data);
      if (upgradesRes.data) setUpgrades(upgradesRes.data);
      if (analyticsRes.data) setAnalyticsData(analyticsRes.data);
      if (notifsRes.data) setNotifications(notifsRes.data);
      if (logsRes.data) setActivityLogs(logsRes.data);
      if (settingsRes.data) setSettings(settingsRes.data);
      setError(null);
    } catch (err) {
      console.error('Failed to load platform data:', err);
      setError(err.message);
      showToast(`Data load warning: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // 1. Create Store Handler
  const handleCreateStore = async (formData) => {
    try {
      const res = await storeService.createStore(formData);
      if (res.success) {
        showToast(`Store "${formData.name}" successfully registered!`, 'success');
        setIsStoreModalOpen(false);
        loadAllData();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 2. Change Store Status Handler
  const handleChangeStoreStatus = (storeId, newStatus) => {
    const store = stores.find(s => s.id === storeId);
    setConfirmModal({
      isOpen: true,
      title: `Change Status for ${store ? store.name : 'Store'}`,
      message: `Are you sure you want to change this store's operational status to "${newStatus}"? This will update live merchant eligibility.`,
      isDanger: newStatus === 'suspended',
      confirmText: `Set to ${newStatus}`,
      onConfirm: async () => {
        try {
          await storeService.updateStoreStatus(storeId, newStatus);
          showToast(`Store status updated to ${newStatus}`, 'success');
          setConfirmModal({ isOpen: false });
          if (selectedStore?.id === storeId) {
            setSelectedStore(prev => ({ ...prev, status: newStatus }));
          }
          loadAllData();
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  };

  // 3. Trigger AI Scan for a Store
  const handleRunAiScan = async (storeId) => {
    setAiScanning(true);
    try {
      const res = await recommendationService.generateRecommendation(storeId);
      if (res.success) {
        showToast(`AI Optima-v2 generated a new recommendation for ${res.data.storeName}!`, 'success');
        await loadAllData();
        setSelectedRec(res.data);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setAiScanning(false);
    }
  };

  // 4. Push AI Recommendation to Store Owner (Core Workflow Bridge)
  const handlePushToOwner = async (recId) => {
    try {
      const res = await recommendationService.pushToOwner(recId);
      if (res.success) {
        showToast('Upgrade proposal dispatched to store owner for review!', 'success');
        await loadAllData();
        setSelectedRec(null);
        setSelectedUpgrade(res.data);
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 5. Update Recommendation Status
  const handleUpdateRecStatus = async (recId, status) => {
    try {
      await recommendationService.updateStatus(recId, status);
      showToast(`Recommendation updated to ${status}`, 'info');
      setSelectedRec(null);
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 6. Record Owner Decision (Simulate Owner Decision)
  const handleRecordOwnerDecision = async (upgradeId, decision, notes) => {
    try {
      const res = await upgradeService.recordOwnerDecision(upgradeId, decision, notes);
      if (res.success) {
        showToast(`Store owner response recorded: ${decision}!`, decision === 'Approved' ? 'success' : 'info');
        setSelectedUpgrade(res.data);
        loadAllData();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 7. Apply Upgrade to Live Merchant Store (Deploy)
  const handleApplyUpgrade = async (upgradeId) => {
    try {
      const res = await upgradeService.applyUpgrade(upgradeId);
      if (res.success) {
        showToast('Website upgrade successfully deployed to merchant store (Simulation mode)!', 'success');
        setSelectedUpgrade(res.data);
        loadAllData();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 8. Rollback Upgrade
  const handleRollbackUpgrade = async (upgradeId, reason) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Rollback',
      message: 'Are you sure you want to rollback the changes applied to this merchant storefront? The store will be reverted to its previous snapshot.',
      isDanger: true,
      confirmText: 'Rollback Storefront',
      onConfirm: async () => {
        try {
          const res = await upgradeService.rollbackUpgrade(upgradeId, reason);
          if (res.success) {
            showToast('Storefront changes rolled back to previous snapshot.', 'info');
            setSelectedUpgrade(res.data);
            setConfirmModal({ isOpen: false });
            loadAllData();
          }
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  };

  // 9. Notifications Handlers
  const handleMarkNotificationRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      showToast('All notifications marked as read', 'info');
    } catch (err) {
      console.error(err);
    }
  };

  // 10. Settings Save Handler
  const handleSaveSettings = async (settingsData) => {
    try {
      const res = await settingsService.updateSettings(settingsData);
      if (res.success) {
        setSettings(res.data);
        showToast('Platform settings saved successfully', 'success');
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AdminLayout
      activeTab={activeTab}
      onNavigate={setActiveTab}
      unreadCount={unreadCount}
      notifications={notifications}
      onMarkNotificationRead={handleMarkNotificationRead}
    >
      {/* Page Routing */}
      {activeTab === 'dashboard' && (
        <DashboardPage
          stores={stores}
          recommendations={recommendations}
          upgrades={upgrades}
          analyticsData={analyticsData}
          activityLogs={activityLogs}
          onNavigate={setActiveTab}
          onOpenStoreModal={() => setIsStoreModalOpen(true)}
          onSelectStore={setSelectedStore}
          onSelectUpgrade={setSelectedUpgrade}
        />
      )}

      {activeTab === 'stores' && (
        <StoreManagementPage
          stores={stores}
          onSelectStore={setSelectedStore}
          onOpenCreateModal={() => setIsStoreModalOpen(true)}
          onChangeStatus={handleChangeStoreStatus}
          onRunAiScan={handleRunAiScan}
          aiScanning={aiScanning}
        />
      )}

      {activeTab === 'recommendations' && (
        <RecommendationsPage
          recommendations={recommendations}
          stores={stores}
          onSelectRec={setSelectedRec}
          onPushToOwner={handlePushToOwner}
          onGenerateRec={handleRunAiScan}
          loading={loading}
        />
      )}

      {activeTab === 'upgrades' && (
        <UpgradeRequestsPage
          upgrades={upgrades}
          onSelectUpgrade={setSelectedUpgrade}
          onRecordOwnerDecision={handleRecordOwnerDecision}
          onApplyUpgrade={handleApplyUpgrade}
          onRollbackUpgrade={handleRollbackUpgrade}
          loading={loading}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsPage
          analyticsData={analyticsData}
        />
      )}

      {activeTab === 'logs' && (
        <NotificationsLogsPage
          notifications={notifications}
          activityLogs={activityLogs}
          onMarkNotificationRead={handleMarkNotificationRead}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsPage
          settings={settings}
          onSaveSettings={handleSaveSettings}
          loading={loading}
        />
      )}

      {/* Global Modals */}
      <StoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        onSave={handleCreateStore}
      />

      <StoreDetailModal
        store={selectedStore}
        isOpen={!!selectedStore}
        onClose={() => setSelectedStore(null)}
        onRunAiScan={handleRunAiScan}
        onChangeStatus={handleChangeStoreStatus}
        aiScanning={aiScanning}
      />

      <RecommendationModal
        rec={selectedRec}
        isOpen={!!selectedRec}
        onClose={() => setSelectedRec(null)}
        onPushToOwner={handlePushToOwner}
        onUpdateStatus={handleUpdateRecStatus}
        loading={loading}
      />

      <WebsitePreviewModal
        upgrade={selectedUpgrade}
        isOpen={!!selectedUpgrade}
        onClose={() => setSelectedUpgrade(null)}
        onRecordOwnerDecision={handleRecordOwnerDecision}
        onApplyUpgrade={handleApplyUpgrade}
        onRollbackUpgrade={handleRollbackUpgrade}
        loading={loading}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        isDanger={confirmModal.isDanger}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ isOpen: false })}
      />

      {/* Toasts Display */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
