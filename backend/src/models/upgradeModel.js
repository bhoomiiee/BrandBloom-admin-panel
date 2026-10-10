import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  timestamp: { type: String },
  message: { type: String }
}, { _id: false });

const upgradeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  storeId: { type: String },
  storeName: { type: String },
  recommendationId: { type: String, default: null },
  title: { type: String },
  description: { type: String },
  category: { type: String },
  ownerApprovalStatus: { type: String, default: 'Pending Approval' },
  implementationStatus: { type: String, default: 'Pending Approval' },
  ownerNotes: { type: String, default: null },
  proposedAt: { type: String },
  decidedAt: { type: String, default: null },
  appliedAt: { type: String, default: null },
  rollbackAvailable: { type: Boolean, default: false },
  previewData: { type: mongoose.Schema.Types.Mixed },
  auditLogs: [auditLogSchema]
}, { versionKey: false });

const Upgrade = mongoose.model('Upgrade', upgradeSchema);

export const upgradeModel = {
  findAll: async (filter = {}) => {
    let query = {};
    if (filter.storeId) query.storeId = filter.storeId;
    if (filter.implementationStatus && filter.implementationStatus !== 'all') query.implementationStatus = filter.implementationStatus;
    if (filter.ownerApprovalStatus && filter.ownerApprovalStatus !== 'all') query.ownerApprovalStatus = filter.ownerApprovalStatus;
    if (filter.search) {
      const q = new RegExp(filter.search, 'i');
      query.$or = [{ title: q }, { storeName: q }, { description: q }];
    }
    return Upgrade.find(query).sort({ proposedAt: -1 }).lean();
  },

  findById: async (id) => Upgrade.findOne({ id }).lean(),

  create: async (data) => {
    const upgrade = new Upgrade({
      id: `upg-${Date.now().toString().slice(-6)}`,
      proposedAt: new Date().toISOString(),
      ownerApprovalStatus: 'Pending Approval',
      implementationStatus: 'Pending Approval',
      decidedAt: null,
      appliedAt: null,
      ownerNotes: null,
      rollbackAvailable: false,
      auditLogs: [{
        timestamp: new Date().toISOString(),
        message: 'Upgrade request created and proposal dispatched to store owner'
      }],
      ...data
    });
    await upgrade.save();
    return upgrade.toObject();
  },

  updateOwnerDecision: async (id, decision, notes = '') => {
    const timestamp = new Date().toISOString();
    const newStatus = decision === 'Approved' ? 'Approved' : 'Rejected';
    const logMsg = `Store owner recorded decision: ${newStatus}${notes ? ` ("${notes}")` : ''}`;
    return Upgrade.findOneAndUpdate(
      { id },
      {
        ownerApprovalStatus: newStatus,
        implementationStatus: newStatus,
        decidedAt: timestamp,
        ...(notes ? { ownerNotes: notes } : {}),
        $push: { auditLogs: { timestamp, message: logMsg } }
      },
      { new: true, lean: true }
    );
  },

  updateImplementationStatus: async (id, status, logMessage = '') => {
    const timestamp = new Date().toISOString();
    const update = { implementationStatus: status };
    if (status === 'Completed') { update.appliedAt = timestamp; update.rollbackAvailable = true; }
    if (status === 'Rolled Back') { update.rollbackAvailable = false; }
    if (logMessage) update.$push = { auditLogs: { timestamp, message: logMessage } };
    return Upgrade.findOneAndUpdate({ id }, update, { new: true, lean: true });
  },

  getStats: async () => {
    const [total, pendingApproval, approved, inProgress, completed, rejected, failed] = await Promise.all([
      Upgrade.countDocuments(),
      Upgrade.countDocuments({ ownerApprovalStatus: 'Pending Approval' }),
      Upgrade.countDocuments({ ownerApprovalStatus: 'Approved' }),
      Upgrade.countDocuments({ implementationStatus: 'In Progress' }),
      Upgrade.countDocuments({ implementationStatus: 'Completed' }),
      Upgrade.countDocuments({ ownerApprovalStatus: 'Rejected' }),
      Upgrade.countDocuments({ implementationStatus: 'Failed' })
    ]);
    return { total, pendingApproval, approved, inProgress, completed, rejected, failed };
  }
};

export { Upgrade };
