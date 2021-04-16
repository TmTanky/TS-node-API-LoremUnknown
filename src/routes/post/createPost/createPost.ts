import { Router } from 'express'
const router = Router()

// Auth
import { authJWT } from '../../../auth/auth'

// Controllers
import { createPost } from '../../../controllers/postController/post'

router.post('/createpost/:userID', authJWT, createPost )

export default router