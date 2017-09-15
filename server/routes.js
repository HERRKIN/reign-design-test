import {Router} from 'express';

// Controller Imports
import storyController from './controllers/storyController'
const router = Router()

// Basic Routes

router.get('/', storyController.getAll)
router.get('/delete/:id', storyController.delete)
export default router
