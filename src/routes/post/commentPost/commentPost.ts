import { Router } from 'express'
const router = Router()

// Auth
import { authJWT } from '../../../auth/auth'

// Controllers
import { commentInPost } from '../../../controllers/postController/post'

router.post('/commentinpost/:postID', authJWT, commentInPost)

export default router