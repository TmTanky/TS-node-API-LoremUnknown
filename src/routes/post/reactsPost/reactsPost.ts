import { Router } from 'express'
const router = Router()

// Auth
import { authJWT } from '../../../auth/auth'

// Controllers
import { likedPost, unlikedPost } from '../../../controllers/postController/post'

router.post('/likedapost/:postID', authJWT, likedPost )
router.post('/unlikedapost/:postID', authJWT, unlikedPost)

export default router