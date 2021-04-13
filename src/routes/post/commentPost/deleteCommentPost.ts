import { Router } from 'express'
const router = Router()

// Auth
import { authJWT } from '../../../auth/auth'

// Controllers
import { deleteComment } from '../../../controllers/postController/post'

router.delete('/deletecommentinpost/:commentID/:postID', authJWT, deleteComment)

export default router