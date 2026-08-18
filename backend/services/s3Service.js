const { s3Client } = require('../config/aws')
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const BUCKET = process.env.S3_BUCKET_NAME || 'carelink-medical-records'
const EXPIRY  = parseInt(process.env.S3_PRESIGNED_URL_EXPIRY || '3600')

const s3Service = {
  /**
   * Upload a file buffer to S3
   */
  uploadFile: async (key, body, contentType = 'application/octet-stream') => {
    const cmd = new PutObjectCommand({
      Bucket: BUCKET, Key: key,
      Body: body, ContentType: contentType,
      ServerSideEncryption: 'AES256',
    })
    return s3Client.send(cmd)
  },

  /**
   * Generate a presigned URL for client-side upload
   */
  getPresignedUploadUrl: async (key, contentType = 'application/octet-stream') => {
    const cmd = new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType })
    return getSignedUrl(s3Client, cmd, { expiresIn: EXPIRY })
  },

  /**
   * Generate a presigned URL for client-side download
   */
  getPresignedDownloadUrl: async (key) => {
    const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key })
    return getSignedUrl(s3Client, cmd, { expiresIn: EXPIRY })
  },

  /**
   * Delete an object from S3
   */
  deleteFile: async (key) => {
    const cmd = new DeleteObjectCommand({ Bucket: BUCKET, Key: key })
    return s3Client.send(cmd)
  },
}

module.exports = { s3Service }
