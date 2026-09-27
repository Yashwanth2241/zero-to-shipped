import multer from 'multer'
import { database } from './db.js'
import { extractResumeText } from './service.js'

export function health(_request, response) {
  response.json({ success: true, message: 'Resume server is running.', database })
}

export async function extractResume(request, response, next) {
  if (!request.file) {
    response.status(400).json({
      success: false,
      error: { code: 'RESUME_REQUIRED', message: 'Upload a PDF in the "resume" field.' },
    })
    return
  }

  try {
    const data = await extractResumeText(request.file.buffer)
    response.json({
      success: true,
      message: 'Resume content extracted successfully.',
      data,
    })
  } catch (error) {
    next(error)
  }
}

export function handleNotFound(_request, response) {
  response.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'The requested endpoint was not found.' },
  })
}

export function handleApiError(error, _request, response, _next) {
  if (error instanceof multer.MulterError) {
    const tooLarge = error.code === 'LIMIT_FILE_SIZE'
    response.status(tooLarge ? 413 : 400).json({
      success: false,
      error: {
        code: tooLarge ? 'FILE_TOO_LARGE' : 'INVALID_UPLOAD',
        message: tooLarge ? 'The PDF must be 5 MB or smaller.' : 'The upload could not be processed.',
      },
    })
    return
  }

  const status = error.status || 500
  response.status(status).json({
    success: false,
    error: {
      code: error.code || 'INTERNAL_SERVER_ERROR',
      message: status === 500 ? 'An unexpected server error occurred.' : error.message,
    },
  })
}