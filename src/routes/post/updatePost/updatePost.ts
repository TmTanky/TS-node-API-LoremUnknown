import { Router } from 'express'
const router = Router()

// Auth
import { authJWT } from '../../../auth/auth'

// Controllers
import { updatePost } from '../../../controllers/postController/post'

router.patch('/updatepost/:postID', authJWT, updatePost)

export default router