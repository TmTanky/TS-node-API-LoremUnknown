import { Router } from 'express'
const router = Router() 

// Controllers
import { registerUser } from '../../controllers/registerController/register'

router.post('/register', registerUser)

export default router
