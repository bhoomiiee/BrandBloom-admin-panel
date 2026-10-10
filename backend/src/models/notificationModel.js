import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String },
  title: { type: String },
  message: { type: String },
  timestamp: { type: String },
  read: { type: Boolean, default: false },
  link: { type: String },
  priority: { type: String, default: 'normal' }
}, { versionKey: false });

const Notification = mongoose.model('Notification', notificationSchema);

export const notificationModel = {
  findAll: async () => Notification.find({}).sort({ timestamp: -1 }).lean(),

  markAsRead: async (id) => {
    return Notification.findOneAndUpdate({ id }, { read: true }, { new: true, lean: true });
  },

  markAllAsRead: async () => {
    await Notification.updateMany({}, { read: true });
    return true;
  },

  create: async (data) => {
    const notif = new Notification({
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'normal',
      ...data
    });
    await notif.save();
    return notif.toObject();
  },

  getUnreadCount: async () => Notification.countDocuments({ read: false })
};

export { Notification };
