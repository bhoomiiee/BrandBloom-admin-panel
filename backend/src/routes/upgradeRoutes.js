import express from 'express';
import { upgradeController } from '../controllers/upgradeController.js';

const router = express.Router();

router.get('/', upgradeController.getUpgrades);
router.get('/stats', upgradeController.getUpgradeStats);
router.get('/:id', upgradeController.getUpgradeById);
router.patch('/:id/owner-decision', upgradeController.recordOwnerDecision);
router.post('/:id/apply', upgradeController.applyUpgrade);
router.post('/:id/rollback', upgradeController.rollbackUpgrade);

export default router;
