import { Router } from 'express'
const router = Router()

// Auth
import { authJWT } from '../../../auth/auth'

// Controllers
import { updateCommentPost } from '../../../controllers/postController/post'

router.patch('/updatecommentinpost/:commentID', authJWT, updateCommentPost )

export default router