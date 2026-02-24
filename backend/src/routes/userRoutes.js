import {Router}from 'express'
import { registerUser } from '../controllers/authController.js'
import { upload } from '../middlewares/multerMiddleware.js';


const router = Router()

router.route('/register').post(
    upload.single("profilePhoto"),
    registerUser);




export default router 