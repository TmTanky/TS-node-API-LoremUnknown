import express from 'express'

const router = express.Router()

// Controllers
import { loginUser } from '../../controllers/loginController/login'

router.post('/login', loginUser)

export default router