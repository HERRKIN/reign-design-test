import {Router} from 'express';

// Controller Imports
import storyController from './controllers/storyController'
// import userController from './controllers/userController'
const router = Router()

// Basic Routes

router.get('/', storyController.getAll)
export default router
