import { Router } from 'express'
import multer from 'multer'
import { extractResume, health } from './controller.js'

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_request, file, callback) => {
    if (file.mimetype !== 'application/pdf' || !file.originalname.toLowerCase().endsWith('.pdf')) {
      const error = new Error('Only PDF files are allowed.')
      error.status = 415
      error.code = 'UNSUPPORTED_FILE_TYPE'
      callback(error)
      return
    }

    callback(null, true)
  },
})

router.get('/health', health)
router.post('/api/resumes', upload.single('resume'), extractResume)

export default router