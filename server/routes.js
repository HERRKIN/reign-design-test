import {Router} from 'express';

// Controller Imports
import storyController from './controllers/storyController'
// import userController from './controllers/userController'
const router = Router()

// Basic Routes

router.get('/', storyController.getAll)
router.get('/delete/:id', storyController.delete)
export default router
