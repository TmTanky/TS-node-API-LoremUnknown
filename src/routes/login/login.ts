import express from 'express'

const router = express.Router()

// Controllers
import { loginUser, logoutUser } from '../../controllers/loginController/login'

router.post('/login', loginUser)
router.get('/logout', logoutUser)

export default router