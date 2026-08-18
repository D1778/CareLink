const required = ['JWT_SECRET']

required.forEach(key => {
  if (!process.env[key]) {
    console.warn(`[ENV] Warning: ${key} is not set. Using default value.`)
  }
})

module.exports = {
  port:     process.env.PORT     || 5000,
  nodeEnv:  process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'carelink-dev-secret',
  jwtExpiry: process.env.JWT_EXPIRES_IN || '24h',
  db: {
    host:     process.env.DB_HOST     || 'localhost',
    port:     process.env.DB_PORT     || 5432,
    name:     process.env.DB_NAME     || 'carelink',
    user:     process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
  aws: {
    region:   process.env.AWS_REGION  || 'us-east-1',
    s3Bucket: process.env.S3_BUCKET_NAME || 'carelink-medical-records',
    dynamoVitalsTable: process.env.DYNAMODB_VITALS_TABLE || 'carelink-vitals',
    dynamoAlertsTable: process.env.DYNAMODB_ALERTS_TABLE || 'carelink-alerts',
    snsAlertTopic:     process.env.SNS_ALERT_TOPIC_ARN   || '',
    kinesisStream:     process.env.KINESIS_VITALS_STREAM || 'carelink-vitals-stream',
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
}
