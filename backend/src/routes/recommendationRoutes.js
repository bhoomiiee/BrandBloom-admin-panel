import express from 'express';
import { recommendationController } from '../controllers/recommendationController.js';

const router = express.Router();

router.get('/', recommendationController.getRecommendations);
router.get('/stats', recommendationController.getRecommendationStats);
router.get('/:id', recommendationController.getRecommendationById);
router.post('/generate', recommendationController.generateRecommendation);
router.patch('/:id/status', recommendationController.updateStatus);
router.post('/:id/push-to-owner', recommendationController.pushToOwner);

export default router;
