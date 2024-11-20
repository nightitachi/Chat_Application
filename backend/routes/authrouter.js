import authController from '../controllers/authController.js'
import express from 'express'
 
const router = express.Router();

router.post('/login' , authController)
router.post('/register' , authController)
router.post('/logout' , authController)

export default router