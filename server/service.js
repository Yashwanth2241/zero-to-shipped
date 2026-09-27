import { PDFParse } from 'pdf-parse'

export class ResumeProcessingError extends Error {
  constructor(status, code, message) {
    super(message)
    this.status = status
    this.code = code
  }
}

export async function extractResumeText(buffer) {
  if (!buffer.subarray(0, 1024).includes(Buffer.from('%PDF-'))) {
    throw new ResumeProcessingError(415, 'INVALID_PDF', 'The uploaded file is not a valid PDF.')
  }

  try {
    const parser = new PDFParse({ data: buffer })
    let parsedPdf
    try {
      parsedPdf = await parser.getText()
    } finally {
      await parser.destroy()
    }

    const text = parsedPdf.text.trim()
    if (!text) {
      throw new ResumeProcessingError(422, 'NO_TEXT_FOUND', 'No readable resume text was found in the PDF.')
    }

    return { text, pageCount: parsedPdf.total }
  } catch (error) {
    if (error instanceof ResumeProcessingError) throw error
    throw new ResumeProcessingError(422, 'PDF_PARSE_FAILED', 'The PDF could not be read.')
  }
}