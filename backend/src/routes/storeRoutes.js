import express from 'express';
import { storeController } from '../controllers/storeController.js';

const router = express.Router();

router.get('/', storeController.getStores);
router.get('/stats', storeController.getStoreStats);
router.get('/:id', storeController.getStoreById);
router.post('/', storeController.createStore);
router.patch('/:id/status', storeController.updateStoreStatus);
router.put('/:id', storeController.updateStore);
router.delete('/:id', storeController.deleteStore);

export default router;
