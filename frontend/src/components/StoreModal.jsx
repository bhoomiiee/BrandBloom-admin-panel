import React, { useState } from 'react';
import { X, Store, User, Mail, Tag, Layers, Globe } from 'lucide-react';

export default function StoreModal({ isOpen, onClose, onSave, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    ownerEmail: '',
    category: 'Home & Living',
    plan: 'Growth',
    url: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.ownerName.trim() || !formData.ownerEmail.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 540 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Store size={22} color="var(--marine-blue)" />
            <h3>Register New Merchant Store</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} disabled={loading}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {error && (
              <div className="alert-banner danger" style={{ margin: 0, padding: '10px 14px', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
                Store Name *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="search-input"
                  style={{ paddingLeft: 12 }}
                  placeholder="e.g. Amber Organic Goods"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                  Owner Full Name *
                </label>
                <input
                  type="text"
                  className="search-input"
                  style={{ paddingLeft: 12 }}
                  placeholder="e.g. Alex Morgan"
                  value={formData.ownerName}
                  onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                  Owner Email *
                </label>
                <input
                  type="email"
                  className="search-input"
                  style={{ paddingLeft: 12 }}
                  placeholder="alex@example.com"
                  value={formData.ownerEmail}
                  onChange={e => setFormData({ ...formData, ownerEmail: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                  Store Category
                </label>
                <select
                  className="select-filter"
                  style={{ width: '100%' }}
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Home & Living">Home & Living</option>
                  <option value="Beauty & Wellness">Beauty & Wellness</option>
                  <option value="Apparel & Sports">Apparel & Sports</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Pet Care">Pet Care</option>
                  <option value="Jewelry & Luxury">Jewelry & Luxury</option>
                  <option value="Consumer Tech">Consumer Tech</option>
                  <option value="General Retail">General Retail</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                  BrandBloom Plan
                </label>
                <select
                  className="select-filter"
                  style={{ width: '100%' }}
                  value={formData.plan}
                  onChange={e => setFormData({ ...formData, plan: e.target.value })}
                >
                  <option value="Starter">Starter (₹2,499/mo)</option>
                  <option value="Growth">Growth (₹6,499/mo)</option>
                  <option value="Pro">Pro Enterprise (₹16,499/mo)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                Storefront URL (Optional)
              </label>
              <input
                type="text"
                className="search-input"
                style={{ paddingLeft: 12 }}
                placeholder="https://mystore.brandbloom.store"
                value={formData.url}
                onChange={e => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Register Store'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
